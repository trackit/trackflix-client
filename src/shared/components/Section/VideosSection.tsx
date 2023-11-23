import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CSS from 'csstype'
import { Thumbnail, VideoOnDemand } from '../../../api/api.interface'
import VideoCardSlider from '../Sliders/VideoCardSlider'
import { navigate } from 'gatsby'
import RightArrowLogo from '../../../assets/logo/right-arrow.svg'

type SectionProps = {
    section: string
    vodAssets: Array<VideoOnDemand>
}

type VideoInfo = {
    thumbnail:
        | {
              obj: Thumbnail | undefined
              url: string
          }
        | undefined
    vod: VideoOnDemand | undefined
    style?: CSS.Properties
    imgStyle?: CSS.Properties
}

const VideosSectionContainer = styled.div``

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SeeAll = styled.span`
    font-size: 22px;
    font-weight: 400;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
    transition: width 150ms ease-out;
    text-align: center;
    background: #ffffff;
    color: var(--trackflix-background-color);
    padding: 0;
    border-radius: 50px;
`

const TitleContainer = styled.div`
    display: flex;
    color: #ffffff;
    cursor: pointer;
    margin-left: 50px;
    align-items: center;
    height: 40px;
    gap: 10px;

    &:hover {
        gap: 20px;
        ${SeeAll} {
            padding: 0 7px;
            width: 90px;
        }
    }
`

const Title = styled.h2`
    color: #ffffff;
    font-weight: 600;
    font-size: 28px;
`

const StyledArrow = styled(RightArrowLogo)`
    z-index: 2;
`

const VideosSection = ({ section, vodAssets }: SectionProps) => {
    const [videoInfos, setVideoInfos] = useState<Array<VideoInfo>>([])

    useEffect(() => {
        const fAssets: Array<VideoInfo> = []
        const assets = vodAssets.filter((asset) => {
            let returnValue = false
            if (asset.media?.genre != null && asset.media?.genre === section) {
                returnValue = true
            }
            return returnValue
        })
        assets.forEach((a) => {
            fAssets.push({
                thumbnail: {
                    obj: a.media.thumbnail,
                    url: a.media.thumbnail?.src || '',
                },
                vod: a,
            })
        })
        setVideoInfos(fAssets)
    }, [])

    return videoInfos && videoInfos.length > 0 ? (
        <VideosSectionContainer>
            <Header>
                <TitleContainer
                    onClick={() => {
                        navigate(`/section/${section}`)
                    }}
                >
                    <Title>{section}</Title>
                    <SeeAll>see all</SeeAll>
                    <StyledArrow />
                </TitleContainer>
            </Header>
            <VideoCardSlider videoInfos={videoInfos} />
        </VideosSectionContainer>
    ) : null
}

export default VideosSection
