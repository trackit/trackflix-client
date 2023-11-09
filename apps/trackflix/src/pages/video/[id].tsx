import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import moment from 'moment'
import Layout from '../../shared/components/Layout'
import VideoPlayerComponent from '../../shared/components/VideoPlayer'
import { VideoOnDemand } from '../../api/api.interface'
import TrackitLogo from '../../assets/logo/trackit-colored.svg'
import { useWindowDimensions } from '../../shared/hooks'
import { screenSizes } from '../../shared/constants'
import { CMSContext } from '../../context/CMSContext'

type VideoPlayerProps = {
    video: VideoOnDemand | undefined
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `${video?.src}`,
                type: 'application/x-mpegURL',
            },
        ],
    }
    return <VideoPlayerComponent {...videoJsOptions} />
}

type IframeVideoPlayerProps = {
    asset: VideoOnDemand
}

const IframeVideoPlayer = ({ asset }: IframeVideoPlayerProps) => {
    const { width } = useWindowDimensions()

    return (
        <iframe
            width="100%"
            height={(9 * width) / 16}
            src={asset.src}
            title={asset.media?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    )
}

const Card = styled.div`
    box-sizing: border-box;
`

const SectionAndDate = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 20px;
`

const FormatedDate = styled.span`
    color: #666666;
    font-size: 16px;
`

const SectionName = styled.span`
    font-size: 16px;
    color: var(--trackflix-primary-color);

    &:after {
        content: ' / ';
    }
`

const Title = styled.h1`
    margin-top: 25px;
    font-size: 44px;
    font-weight: bold;
    color: #ffffff;

    @media (max-width: ${screenSizes.xs}px) {
        font-size: 34px;
        flex-direction: column;
        align-items: flex-start;
    }
`

const Description = styled.p`
    margin-top: 50px;
    font-size: 22px;
    padding-bottom: 50px;
    color: #ffffff;
`

const AuthorAndViewCount = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: ${screenSizes.xs}px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

const Author = styled.span`
    display: flex;
    font-size: 30px;
    color: #ffffff;
    align-items: center;

    @media (max-width: ${screenSizes.xs}px) {
        font-size: 24px;
    }
`

const AuthorImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333333;
    box-shadow: 0 2px 4px #000000;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin-right: 15px;

    @media (max-width: ${screenSizes.xs}px) {
        width: 10vw;
        height: 10vw;
    }
`

const ViewCount = styled.span`
    color: #666666;
    font-size: 22px;
`
const VideoData = styled.div`
    padding: 0 100px;

    @media (max-width: ${screenSizes.s}px) {
        padding: 0 20px;
    }
`

const Container = styled.div``

const VideoPage = (props: PageProps) => {
    const id = props.params.id
    const [asset, setAsset] = useState<VideoOnDemand | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [mediaSection, setMediaSection] = useState<string>('')
    const { api } = useContext(CMSContext)

    useEffect(() => {
        const videoNode = document.querySelector('video')
        if (!videoNode) return

        videoNode?.addEventListener(
            'play',
            () => {
                if (asset?.media?.id && asset?.media?.viewCount) {
                    api.updateAsset(asset?.media?.id, {
                        views: asset?.media?.viewCount + 1 || 1,
                    })
                }
            },
            { once: true }
        )
    }, [loaded])

    useEffect(() => {
        ;(async () => {
            try {
                const data = await api.fetchVodAsset(id)
                setMediaSection(data?.media?.genre || '')
                if (data === null) {
                    console.error('object doesnt exist')
                } else {
                    setAsset(data as VideoOnDemand)
                }
                setLoaded(true)
            } catch (error) {
                console.error('video/[id].tsx(fetchVodAsset)', error)
                setLoaded(false)
            }
        })()
    }, [api.fetchVodAsset])

    return (
        <Layout>
            <Container>
                {asset === null ? (
                    <p>{loaded && 'Video Not Found'}</p>
                ) : (
                    <Card>
                        {asset.src !== null ? (
                            <VideoPlayer video={asset} />
                        ) : (
                            <IframeVideoPlayer asset={asset} />
                        )}
                        <VideoData>
                            <SectionAndDate>
                                <div>
                                    <SectionName>{mediaSection}</SectionName>
                                </div>
                                <FormatedDate>
                                    {moment(asset.media?.createdAt).format(
                                        'MMM Do YYYY'
                                    )}
                                </FormatedDate>
                            </SectionAndDate>
                            <Title>{asset.media?.title}</Title>
                            <AuthorAndViewCount>
                                <Author>
                                    <AuthorImage>
                                        <TrackitLogo width="70%" height="70%" />
                                    </AuthorImage>
                                    Author name
                                </Author>
                                <ViewCount>
                                    View count
                                    <br />
                                    {asset.media?.viewCount ?? 0}
                                </ViewCount>
                            </AuthorAndViewCount>
                            <Description>
                                {asset.media?.description}
                            </Description>
                        </VideoData>
                    </Card>
                )}
            </Container>
        </Layout>
    )
}

export default VideoPage
