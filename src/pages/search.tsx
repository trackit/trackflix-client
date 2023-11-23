import React, { useEffect, useState, useMemo, useContext } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import Layout from '../shared/components/Layout'
import { VideoOnDemand } from '../api/api.interface'
import { Thumbnail } from '../models'
import VideoCard from '../shared/components/Card/VideoCard'
import { screenSizes, defaultVideoCardProperties } from '../shared/constants'
import { useWindowDimensions } from '../shared/hooks'
import { CMSContext } from '../context/CMSContext'

const StyledSearchItem = styled.div`
    display: flex;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 2px solid ${(props) => props.theme.palette.primary.main};
    border-radius: 50px;
    min-height: 42px;
    width: 300px;
    padding: 10px;
    align-items: center;

    @media (max-width: ${screenSizes.s}px) {
        border-left: none;
        border-right: none;
        border-radius: 0;
        padding: 10px 0;
        width: 100%;
        max-width: 100%;
    }
`

const StyledSearchInput = styled.input`
    border: none;
    height: 100%;
    flex: 1;
    padding: 0 5px;
    font-size: 18px;
    background: none;
    color: #ffffff;
    margin: 0 10px;

    &:focus {
        outline: none;
    }

    @media (max-width: ${screenSizes.s}px) {
        margin-left: 30px;
    }
`

const StyledSearch = styled.div`
    margin: 0 10px;

    & svg {
        color: ${(props) => props.theme.palette.primary.main};
        font-size: 26px;
    }

    @media (max-width: ${screenSizes.s}px) {
        margin-right: 30px;
    }
`

const StyledVideoList = styled.div`
    padding: 0 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const StyledVideoCard = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

type VideoItemProps = {
    vod: VideoOnDemand
}

const VideoItem = ({ vod }: VideoItemProps) => {
    const [thumbnail, setThumbnail] = useState<{
        obj: Thumbnail
        url: string
    }>()
    const { width } = useWindowDimensions()
    const videoCardProperties = useMemo(() => {
        if (defaultVideoCardProperties.width > width - 100) {
            return {
                ...defaultVideoCardProperties,
                width: width - 100,
                infos: 'hide',
            }
        }
        return defaultVideoCardProperties
    }, [width])
    const { api } = useContext(CMSContext)

    useEffect(() => {
        ;(async () => {
            try {
                const data = await api.fetchThumbnail(vod.id)
                setThumbnail({
                    obj: data,
                    url: data?.src as string,
                })
            } catch (error) {
                console.error('search.tsx(fetchThumbnail):', error)
            }
        })()
    }, [vod])

    return (
        <StyledVideoCard>
            {thumbnail && (
                <VideoCard
                    video={{
                        vod,
                        thumbnail,
                    }}
                    cardWidth={videoCardProperties.width}
                    cardHeight={videoCardProperties.height}
                    videoInfos={videoCardProperties.infos}
                />
            )}
        </StyledVideoCard>
    )
}

const SearchPage = () => {
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')
    const { width } = useWindowDimensions()
    const { api } = useContext(CMSContext)

    const filterAssets = (elem: VideoOnDemand) =>
        elem.media?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        elem?.media?.description
            ?.toLowerCase()
            .includes(searchValue.toLowerCase())

    useEffect(() => {
        ;(async () => {
            try {
                const response = await api.fetchVodFiles(nextToken)
                setNextToken(response?.nextToken ? response?.nextToken : null)
                setVodAssets(response.data)
            } catch (error) {
                console.error('search.tsx(fetchVodFiles):', error)
            }
        })()
    }, [nextToken])

    return (
        <Layout>
            <StyledSearchItem>
                <StyledSearchInput
                    type="text"
                    placeholder="Search.."
                    name="search"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {width >= screenSizes.xs && (
                    <StyledSearch>
                        <AiOutlineSearch />
                    </StyledSearch>
                )}
            </StyledSearchItem>
            <StyledVideoList>
                {vodAssets
                    .filter(filterAssets)
                    .map((elem: VideoOnDemand, key) => {
                        return <VideoItem vod={elem} key={key} />
                    })}
            </StyledVideoList>
        </Layout>
    )
}

export default SearchPage
