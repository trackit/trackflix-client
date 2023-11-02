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
    const [sections, setSections] = useState<Array<Section> | null>(null)
    const [loadingVodFiles, setLoadingVodFiles] = useState<boolean>(false)
    const [loadingSections, setLoadingSections] = useState<boolean>(false)
    // const [haveHighlightedContent, setHaveHighlightedContent] = useState(false)

    const testSection: Section = {
        id: 'MOVIE',
        label: 'Test',
        description: 'This is a test',
    }
    const { api } = useContext(CMSContext)

    useEffect(() => {
        ;(async () => {
            setLoadingVodFiles(true)
            try {
                const fetchedData = await api.fetchVodFiles(null)
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
                        if (asset.media?.thumbnail?.src != null) {
                            thumbnailArr.push({
                                obj: asset.media.thumbnail,
                                url: asset.media.thumbnail.src,
                            })
                        } else {
                            const data = await api.fetchThumbnail(asset.id)
                            thumbnailArr.push({
                                obj: data,
                                url: data.src as string,
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
        })()
    }, [])

    // useEffect(() => {
    //     ;(async () => {
    //         setLoadingSections(true)
    //         try {
    //             const { data } = await fetchSections()
    //             let nonce = true
    //             const list = data?.listSections?.items as Array<Section>
    //             if (haveHighlightedContent) {
    //                 list.forEach((item, index, arr) => {
    //                     if (arr.length <= 3 && nonce) {
    //                         arr.push({
    //                             label: 'Highlighted',
    //                             id: `Highlighted${index}`,
    //                             description: 'Highlighted content',
    //                         })
    //                         nonce = false
    //                     }
    //                     if (
    //                         index % 3 === 0 &&
    //                         index !== 0 &&
    //                         item?.label !== 'Highlighted'
    //                     ) {
    //                         arr.splice(index, 0, {
    //                             label: 'Highlighted',
    //                             id: `Highlighted${index}`,
    //                             description: 'Highlighted content',
    //                         })
    //                     }
    //                 })
    //             }
    //             setSections(list)
    //         } catch (error) {
    //             console.error('videos.tsx(fetchSections)', error)
    //         }
    //         setLoadingSections(false)
    //         console.log('LOADING SECTIONS: ' + sections)
    //     })()
    // }, [])

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
                        section={'dogs'}
                        vodAssets={vodAssets}
                        thumbnails={thumbnails}
                    />
                </OverflowContainer>
            )}
        </Container>
    )
}

export default VideoPage
