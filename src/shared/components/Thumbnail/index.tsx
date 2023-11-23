import React, { useRef } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import PlayLogo from '../../../assets/logo/logo-play.svg'
import { VideoElement, VideoStatus } from '../Card/VideoCard'

const ThumbnailContainer = styled.div<{
    thumbUrl?: string
    hover?: boolean
    width?: number
    height?: number
    playing?: boolean
}>`
    position: relative;
    background-image: ${(props) =>
        props.playing || !props.thumbUrl ? 'none' : `url(${props.thumbUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    border-radius: ${(props) => (props.hover ? '10px 10px 0 0' : '10px')};
    overflow: hidden;

    video {
        object-fit: cover;
    }
`

const TransparentOverlay = styled.div<{ visible: boolean }>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(50, 50, 50, 0.5);
    width: 100%;
    height: 100%;
    border-top-right-radius: 10px;
    top: 0;
    transition: opacity 200ms;
    opacity: ${(props) => (props.visible ? 1 : 0)};
`

interface ThumbnailProps {
    video: VideoElement
    videoStatus: VideoStatus
    loadVideo?: boolean
    width: number
    height: number
}

const Thumbnail = ({
    video,
    videoStatus,
    loadVideo = true,
    width,
    height,
}: ThumbnailProps) => {
    const playerRef = useRef<ReactPlayer>(null)

    return (
        <ThumbnailContainer
            thumbUrl={video.thumbnail.obj.src}
            hover={videoStatus.playing}
            width={width}
            height={height}
        >
            {loadVideo && (
                <ReactPlayer
                    ref={playerRef}
                    style={{ opacity: videoStatus.playing ? '1' : '0' }}
                    width="100%"
                    height="100%"
                    url={video.vod.src}
                    controls={false}
                    playing={videoStatus.playing}
                    muted
                    config={{
                        youtube: {
                            playerVars: {
                                controls: 0,
                                rel: 0,
                            },
                        },
                    }}
                />
            )}
            <TransparentOverlay visible={videoStatus.playing}>
                <PlayLogo />
            </TransparentOverlay>
        </ThumbnailContainer>
    )
}

export default Thumbnail
