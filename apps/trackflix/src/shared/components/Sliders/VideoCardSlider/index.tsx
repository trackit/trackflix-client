import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CSS from 'csstype'
import { Thumbnail, VideoOnDemand } from '../../../../api/api.interface'
import { defaultVideoCardProperties, screenSizes } from '../../../constants'
import {
    NextArrow,
    PrevArrow,
} from '../../Button/FloatingDirectionalArrowButtons'
import { useWindowDimensions } from '../../../hooks'
import VideoCard from '../../Card/VideoCard'

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

type Props = {
    videoInfos: Array<VideoInfo>
    padding?: number
    spaceBetweenItems?: number
    redirectTo?: null | string
}

const SlidingContainer = styled.div`
    display: flex;
    height: ${({ height }) => height + 20}px;
    align-items: center;
    width: 100vw;
    transition: margin-left 500ms ease-out;
    margin-left: ${(props) => props.left}px;
    gap: ${({ spaceBetweenItems }) => spaceBetweenItems}px;
`

const ListContainer = styled.div`
    display: flex;
    align-items: center;
    height: ${({ height }) => height + 20}px;
    position: relative;
`

const VideoCardList = ({
    videoInfos,
    padding = 50,
    spaceBetweenItems = 20,
    redirectTo = null,
}: Props) => {
    const [scroll, setScroll] = useState(0)
    const [cardProperties, setCardProperties] = useState(
        defaultVideoCardProperties
    )
    const { width } = useWindowDimensions()

    useEffect(() => {
        if (width < screenSizes.xs) {
            setCardProperties({
                width: width - 150,
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
            setCardProperties(defaultVideoCardProperties)
        }
    }, [width])

    const itemTotalWidth = cardProperties.width + spaceBetweenItems
    const nbVideoPerSlide = Math.floor(
        (width - padding + spaceBetweenItems) / itemTotalWidth
    )

    useEffect(() => {
        setScroll(0)
    }, [width])

    return (
        <ListContainer padding={padding} height={cardProperties.height}>
            <SlidingContainer
                left={scroll * itemTotalWidth + padding}
                height={cardProperties.height}
                spaceBetweenItems={spaceBetweenItems}
            >
                {videoInfos.map((videoInfo, index: number) => {
                    return (
                        <VideoCard
                            key={videoInfo.vod?.id + index}
                            video={videoInfo}
                            redirectTo={redirectTo}
                            cardWidth={cardProperties.width}
                            cardHeight={cardProperties.height}
                            videoInfos={cardProperties.infos}
                        />
                    )
                })}
            </SlidingContainer>
            {scroll < 0 && (
                <PrevArrow
                    onClick={() => setScroll(scroll + nbVideoPerSlide)}
                />
            )}
            {-scroll < videoInfos.length - nbVideoPerSlide && (
                <NextArrow
                    onClick={() => setScroll(scroll - nbVideoPerSlide)}
                />
            )}
        </ListContainer>
    )
}

export default VideoCardList
