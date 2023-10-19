import React from 'react'
import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import VideosSection from '../components/Section/VideosSection'
import Loader from '../../shared/components/Loader'
import { CMSContext } from '../../context/CMSContext'
import { Thumbnail, VideoOnDemand } from '../../api/api.interface'
import { Section } from '../../models'

const Container = styled.div`
    flex: 1;
    position: relative;
    top: -200px;
    z-index: 3;
    background-color: red;
`

const OverflowContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px;
    overflow-x: hidden;
    padding-top: 50px;
    padding-bottom: 60px;
`

const VideoPage = () => {
    const [vodAssets, setVodAssets] = useState<VideoOnDemand[]>([])
    const [thumbnails, setThumbnails] = useState<
        Array<{
            obj: Thumbnail | undefined
            url: string
        }>
    >([])
    //const [sections, setSections] = useState<Array<Section> | null>(null)
    const [loadingVodFiles, setLoadingVodFiles] = useState<boolean>(false)
    // const [loadingSections, setLoadingSections] = useState<boolean>(false)
    // const [haveHighlightedContent, setHaveHighlightedContent] = useState(false)

    const testSection: Section = {
        id: 'test',
        label: 'VODs',
        description: 'test',
    }
    const { api } = useContext(CMSContext)

    useEffect(() => {
        ;(async () => {
            setLoadingVodFiles(true)
            try {
                const fetchedData = await api.fetchVodFiles(null)
                //console.log(fetchedData.data)
                const assets = fetchedData.data
                setVodAssets(assets)
                const thumbnailArr: Array<{
                    obj: Thumbnail | undefined
                    url: string
                }> = []
                // if (
                //     assets.findIndex(
                //         (elem) => elem.media?.highlighted === true
                //     ) ! "" == -1
                // ) {
                //     setHaveHighlightedContent(true)
                // }
                await Promise.all(
                    assets.map(async (asset) => {
                        //console.log(asset)
                        if (asset.media?.thumbnail?.src != null) {
                            thumbnailArr.push({
                                obj: asset.media.thumbnail,
                                url: asset.media.thumbnail.src,
                            })
                        } else {
                            //console.log('PRE DATA:')
                            const data = await api.fetchThumbnail(asset.id)
                            console.log('DATA:')
                            console.log(data)
                            thumbnailArr.push({
                                obj: asset.media?.thumbnail,
                                url: data.src!,
                            })
                        }
                    })
                )
                setThumbnails(thumbnailArr)
                */
            } catch (error) {
                console.error('videos.tsx(fetchVodFiles):', error)
            }
            setLoadingVodFiles(false)
            // console.log('VOD ASSETS:')
            // console.log(vodAssets)
            // console.log('THUMBNAILS ASSETS:')
            // console.log(thumbnails)
            // console.log(loadingVodFiles)
        })()
    }, [])

    useEffect(() => {
        console.log('VOD ASSETS:')
        console.log(vodAssets)
        console.log('THUMBNAILS ASSETS:')
        console.log(thumbnails)
        console.log(loadingVodFiles)
    }, [vodAssets, thumbnails, loadingVodFiles])

    return (
        <Container>
            {loadingVodFiles ? (
                <Loader />
            ) : (
                <OverflowContainer>
                    <VideosSection
                        key={'test'}
                        section={testSection}
                        vodAssets={vodAssets}
                        thumbnails={thumbnails}
                    />
                </OverflowContainer>
            )}
        </Container>
    )
}

export default VideoPage
