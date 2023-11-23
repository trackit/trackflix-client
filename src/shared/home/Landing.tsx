import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { navigate } from 'gatsby'
import intro from '../../videos/introduction-video.mp4'
import PlayLogo from '../../assets/logo/logo-play-without-circle.svg'
import { screenSizes } from '../constants'
import { useWindowDimensions } from '../hooks'
import { CMSContext } from '../../context/CMSContext'
import { VideoOnDemand } from '../../api/api.interface'

const LandingContainer = styled.div`
    width: 100%;
    height: 80vh;
    min-height: 80vh;
    position: relative;

    video {
        object-fit: cover;
    }
`

const VideoPlayer = styled(ReactPlayer)`
    z-index: 1;
`

const Shadower = styled.div`
    position: absolute;
    height: 200px;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background: linear-gradient(
        to top,
        var(--trackflix-background-color),
        transparent
    );
`

const VideoInfosContainer = styled.div`
    position: absolute;
    width: 40%;
    left: 50px;
    bottom: 35%;

    @media (max-width: ${screenSizes.xs}px) {
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        bottom: 200px;
    }
`

const VideoTitle = styled.h1`
    color: #ffffff;
    font-size: 8vh;
    font-weight: bold;
`

const VideoDescription = styled.h3`
    color: #ffffff;
    font-size: 3vh;
`

const PlayButton = styled.div`
    cursor: pointer;
    width: 16vh;
    max-width: 16vh;
    height: 4vh;
    background-color: #ffffff;
    color: var(--trackflix-background-color);
    border-radius: 5px;
    transition: background-color 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2vh;
    gap: 14px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: ${screenSizes.xs}px) {
        height: 40px;
        width: 150px;
        max-width: 150px;
        font-size: 18px;
    }
`

const StyledPlayLogo = styled(PlayLogo)`
    transform: scale(1, 0.8);
`

const Landing = () => {
    const [source, setSource] = useState<string | null>(null)
    const [video, setVideo] = useState<VideoOnDemand | null>(null)
    const { width } = useWindowDimensions()
    const { api } = useContext(CMSContext)

    useEffect(() => {
        const fetchHighlited = async () => {
            const highlightedVideos = await api.fetchHighlightedVideos()
            if (highlightedVideos && highlightedVideos.length > 0) {
                const media = highlightedVideos[0]
                setVideo(media)
                setSource(media.src as string)
            } else {
                setSource(intro)
            }
        }
        fetchHighlited()
    }, [])

    return (
        <LandingContainer>
            {source && (
                <>
                    <VideoPlayer
                        width="100%"
                        height="80vh"
                        url={source}
                        controls={false}
                        playing
                        muted
                        loop
                        config={{
                            youtube: {
                                playerVars: {
                                    controls: 0,
                                    rel: 0,
                                },
                            },
                        }}
                    />
                    {video && (
                        <VideoInfosContainer>
                            {width > screenSizes.xs && (
                                <VideoTitle>
                                    {video && video.media?.title}
                                </VideoTitle>
                            )}
                            {width > screenSizes.s && (
                                <VideoDescription>
                                    {video && video.media?.description}
                                </VideoDescription>
                            )}
                            <PlayButton
                                onClick={() =>
                                    video &&
                                    video.id &&
                                    navigate(`/video/${video.id}`)
                                }
                            >
                                <StyledPlayLogo height="50%" />
                                Play
                            </PlayButton>
                        </VideoInfosContainer>
                    )}
                    <Shadower />
                </>
            )}
        </LandingContainer>
    )
}

export default Landing
