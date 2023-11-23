import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../shared/components/Layout'
import Loader from '../../shared/components/Loader'
import moment from 'moment'
import TrackitLogo from '../../assets/logo/trackit-colored.svg'
import LinesEllipsis from 'react-lines-ellipsis'
import SectionVideosSorted, {
    KEY_SORT_BY_MOST_RECENT,
    KEY_SORT_BY_MOST_VIEWED,
} from '../../shared/components/Section/SectionVideosSorted'
import VideoCard, { VideoElement } from '../../shared/components/Card/VideoCard'
import { useWindowDimensions } from '../../shared/hooks'
import { screenSizes } from '../../shared/constants'
import { CMSContext } from '../../context/CMSContext'
import { VideoOnDemand, Thumbnail } from '../../api/api.interface'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-bottom: 90px;
`

const Title = styled.h1`
    margin-top: 30px;
    font-size: 36px;
    color: #ffffff;
`

const Separator = styled.div`
    background-color: var(--trackflix-primary-color);
    height: 2px;
    width: 100px;
    margin-bottom: 20px;
`

// const Description = styled.h2`
//     font-size: 18px;
//     color: #ffffff;
//     max-width: 1000px;
//     text-align: center;
//     margin: 0 50px;
// `

const LoaderWrapper = styled.div`
    padding-top: 50px;
`

const SplitScreen = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: ${screenSizes.m}px) {
        flex-direction: column;
    }
`

const SplitScreenContainer = styled.div`
    margin-bottom: 50px;
`

const LeftPanel = styled.div`
    padding-left: 50px;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 55%;
    padding-right: 40px;
    gap: 20px;

    @media (max-width: ${screenSizes.m}px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
`

const RightPanel = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 45%;
    min-width: 380px;

    @media (max-width: ${screenSizes.m}px) {
        margin-top: 80px;
        max-width: 100%;
        min-width: 0;
        justify-content: center;
    }
`

const VideoCardContainer = styled.div`
    display: flex;
`

const LeftPanelItemContentTitle = styled.div`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 5px;
    color: #ffffff;
`

const LeftPanelItemContentAuthor = styled.div`
    font-size: 11px;
    font-weight: bold;
    color: #ffffff;
`

const LeftPanelItemContentCountDate = styled.div`
    font-size: 11px;
    color: #ffffff;
`

const ChannelLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #333333;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: absolute;
    top: 20px;
    left: -20px;
`

const capitalizeFirstLetter = (input: string) => {
    input = input.toLowerCase()
    return input.charAt(0).toUpperCase() + input.slice(1)
}

const SectionPage = (props: PageProps) => {
    const id = props.params.id
    const [section, setSection] = useState<string | null>(null)
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [cardProperties, setCardProperties] = useState({
        infos: 'show',
        height: 180,
        width: 300,
    })
    const [thumbnails, setThumbnails] = useState<
        Array<{
            obj: Thumbnail | undefined
            url: string
        }>
    >([])
    const { width } = useWindowDimensions()
    const { api } = useContext(CMSContext)

    useEffect(() => {
        ;(async () => {
            const sectionId = capitalizeFirstLetter(id)
            setSection(sectionId)
        })()
    }, [id])

    useEffect(() => {
        ;(async () => {
            try {
                const data = await api.fetchVodFiles(null, true)
                const fetchedVodAssets = data?.data
                const assets = fetchedVodAssets.filter((asset) => {
                    let returnValue = false
                    if (
                        asset.media.genre.toLowerCase() ===
                        section?.toLowerCase()
                    ) {
                        returnValue = true
                    }
                    return returnValue
                })
                setVodAssets(assets)
                const thumbnailArr: Array<{
                    obj: Thumbnail | undefined
                    url: string
                }> = await Promise.all(
                    assets.map(async (asset) => {
                        if (asset.media?.thumbnail?.src) {
                            return {
                                obj: asset.media.thumbnail,
                                url: asset.media.thumbnail.src,
                            }
                        } else {
                            const data = await api.fetchThumbnail(asset.id)
                            return {
                                obj: data,
                                url: data.src || '',
                            }
                        }
                    })
                )
                setThumbnails(thumbnailArr)
            } catch (error) {
                console.error('videos/section/[id].tsx(fetchVodFiles):', error)
            }
        })()
    }, [section])

    useEffect(() => {
        if (width <= 600) {
            setCardProperties({
                width: width - 100,
                height: 220,
                infos: 'hide',
            })
        } else if (width < screenSizes.s) {
            setCardProperties({
                width: 200,
                height: 220,
                infos: 'hide',
            })
        } else {
            setCardProperties({ infos: 'show', height: 180, width: 300 })
        }
    }, [width])

    return (
        <Layout>
            {section ? (
                <Container>
                    <Header>
                        <Title>{section}</Title>
                        <Separator />
                        {/* <Description>{section}</Description> */}
                    </Header>
                    <SplitScreenContainer>
                        {thumbnails.length > 0 && (
                            <SplitScreen>
                                <LeftPanel>
                                    {vodAssets.map((vod) => {
                                        const thumbnail = thumbnails.find(
                                            (thumb) =>
                                                thumb.obj?.id ===
                                                vod.media?.thumbnail?.id
                                        )
                                        const video = {
                                            vod,
                                            thumbnail,
                                        }
                                        return (
                                            <VideoCardContainer key={vod.id}>
                                                <VideoCard
                                                    video={
                                                        video as VideoElement
                                                    }
                                                    videoInfos={
                                                        cardProperties.infos
                                                    }
                                                    cardWidth={
                                                        cardProperties.width
                                                    }
                                                    cardHeight={
                                                        cardProperties.height
                                                    }
                                                >
                                                    {width > screenSizes.m && (
                                                        <>
                                                            <ChannelLogo>
                                                                <TrackitLogo width="25" />
                                                            </ChannelLogo>
                                                            <div>
                                                                <LeftPanelItemContentTitle>
                                                                    {
                                                                        vod
                                                                            .media
                                                                            ?.title
                                                                    }
                                                                </LeftPanelItemContentTitle>
                                                                <LinesEllipsis
                                                                    text={
                                                                        vod
                                                                            .media
                                                                            ?.description
                                                                    }
                                                                    maxLine="5"
                                                                    ellipsis="..."
                                                                    trimRight
                                                                    style={{
                                                                        fontSize:
                                                                            '14px',
                                                                        color: '#FFFFFF',
                                                                    }}
                                                                    basedOn="letters"
                                                                />
                                                            </div>
                                                            <div>
                                                                <LeftPanelItemContentAuthor>
                                                                    {
                                                                        vod
                                                                            .media
                                                                            ?.author
                                                                    }
                                                                </LeftPanelItemContentAuthor>
                                                                <LeftPanelItemContentCountDate>
                                                                    {vod.media
                                                                        ?.viewCount ||
                                                                        0}{' '}
                                                                    views -{' '}
                                                                    {moment(
                                                                        vod
                                                                            .media
                                                                            ?.createdAt
                                                                    ).fromNow()}
                                                                </LeftPanelItemContentCountDate>
                                                            </div>
                                                        </>
                                                    )}
                                                </VideoCard>
                                            </VideoCardContainer>
                                        )
                                    })}
                                </LeftPanel>
                                <RightPanel>
                                    {[
                                        KEY_SORT_BY_MOST_VIEWED,
                                        KEY_SORT_BY_MOST_RECENT,
                                    ].map((key, index) => (
                                        <SectionVideosSorted
                                            key={key + index}
                                            videos={vodAssets}
                                            thumbnails={thumbnails}
                                            sortBy={key}
                                            cardProperties={cardProperties}
                                        />
                                    ))}
                                </RightPanel>
                            </SplitScreen>
                        )}
                    </SplitScreenContainer>
                </Container>
            ) : (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            )}
        </Layout>
    )
}

export default SectionPage
