import React, { useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import TrackitLogo from '../../../assets/logo/trackit-colored.svg'
import Thumbnail from '../Thumbnail'
import {
    Thumbnail as IThumbnail,
    VideoOnDemand,
} from '../../../api/api.interface'

interface VideoStatus {
    playing: boolean
    played: number
    loaded: number
    duration: number
    seeking: boolean
}

export const VideoCardContainer = styled.div<{
    playing: boolean
    videoInfos: string
    width: number
    height: number
}>`
    display: flex;
    flex-direction: column;
    width: ${({ width }) => width}px;
    min-width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    min-height: ${({ height }) => height}px;
    transition: box-shadow 200ms ease-out, transform 200ms ease-out,
        height 200ms ease-out;
    transform: scale(${(props) => (props.playing ? 1.1 : 1)});
    ${(props) =>
        props.playing && 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);'};
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    z-index: ${({ playing }) => (playing ? 6 : 5)};
`

const VideoCardGivenChildrenContainer = styled.div<{
    playing: boolean
    width: number
}>`
    display: flex;
    flex: 1;
    transition: box-shadow 200ms ease-out, transform 200ms ease-out;
    transform: scale(${(props) => (props.playing ? 1.02 : 1)});
    ${(props) =>
        props.playing && 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);'};
    margin-right: 20px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    max-height: 170px;
`

const VideoInformations = styled.div<{
    transparent: boolean
}>`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    background-color: ${(props) =>
        props.transparent ? 'transparent' : '#222222'};
    padding: 10px;
    position: relative;
    transition: background-color 200ms ease-out;
    color: #ffffff;
`

const VideoText = styled.div`
    height: 100%;
    margin-top: 15px;
    text-align: left;
`

const VideoTitle = styled.div`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const VideoAuthor = styled.div`
    font-size: 18px;
    margin-bottom: 5px;
`

const ViewsAndDate = styled.div`
    font-size: 14px;
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
    top: -20px;
    left: 20px;
`

const CardItemContentContainer = styled.div<{
    transparent: boolean
}>`
    padding: 12px 12px 12px 32px;
    display: flex;
    position: relative;
    flex: 1;
    inline-size: 150px;
    flex-direction: column;
    justify-content: space-between;
    ${(props) => (props.transparent ? '' : 'background-color: #222222;')}
    transition: background-color 200ms ease-out;
`

export interface VideoElement {
    vod: VideoOnDemand
    thumbnail: {
        obj: IThumbnail
        url: string
    }
}

interface VideoCardProps {
    video: VideoElement
    haveSubtitle?: boolean
    children?: React.ReactNode
    redirectTo?: string | null
    videoInfos?: string
    cardWidth?: number
    cardHeight?: number
}

const VideoCard = ({
    video,
    haveSubtitle = false,
    children,
    redirectTo = null,
    videoInfos = 'hover',
    cardWidth = 360,
    cardHeight = 200,
}: VideoCardProps) => {
    const [videoStatus, setVideoStatus] = useState<VideoStatus>({
        playing: false,
        played: 0,
        loaded: 0,
        duration: 0,
        seeking: false,
    })

    const updateVideoStatus = (updatedData: VideoStatus) =>
        setVideoStatus({
            ...videoStatus,
            ...updatedData,
        })
    const handleMouseLeave = () => {
        updateVideoStatus({ ...videoStatus, playing: false })
    }
    const handleMouseEnter = () => {
        updateVideoStatus({ ...videoStatus, playing: true })
    }

    return children ? (
        <VideoCardGivenChildrenContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            playing={videoStatus.playing}
            onClick={() =>
                navigate(redirectTo ? redirectTo : `/video/${video?.vod?.id}`)
            }
            width={cardWidth}
        >
            <Thumbnail
                video={video}
                videoStatus={videoStatus}
                width={cardWidth}
                height={cardHeight}
                loadVideo={videoStatus.playing}
            />
            <CardItemContentContainer transparent={!videoStatus.playing}>
                {children}
            </CardItemContentContainer>
        </VideoCardGivenChildrenContainer>
    ) : (
        <VideoCardContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            playing={videoStatus.playing}
            videoInfos={videoInfos}
            onClick={() =>
                navigate(redirectTo ? redirectTo : `/video/${video?.vod?.id}`)
            }
            width={cardWidth}
            height={
                (videoInfos === 'hover' && videoStatus.playing) ||
                videoInfos === 'show'
                    ? cardHeight + 100
                    : cardHeight
            }
        >
            <Thumbnail
                video={video}
                videoStatus={videoStatus}
                loadVideo={videoStatus.playing}
                width={cardWidth}
                height={cardHeight}
            />
            {((videoInfos === 'hover' && videoStatus.playing) ||
                videoInfos === 'show') && (
                <VideoInformations transparent={!videoStatus.playing}>
                    <ChannelLogo>
                        <TrackitLogo width="25" />
                    </ChannelLogo>
                    <VideoText>
                        <VideoTitle>
                            {video.vod?.media?.title
                                ? video.vod?.media?.title
                                : 'Video Title'}
                        </VideoTitle>
                        {haveSubtitle ? (
                            <div style={{ display: 'flex', flex: 1 }} />
                        ) : (
                            <>
                                <VideoAuthor>Author</VideoAuthor>
                                <ViewsAndDate>
                                    1M views - 18 sep 2025
                                </ViewsAndDate>
                            </>
                        )}
                    </VideoText>
                </VideoInformations>
            )}
        </VideoCardContainer>
    )
}

export default VideoCard
