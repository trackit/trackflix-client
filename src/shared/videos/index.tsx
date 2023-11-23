import React from 'react'
import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import VideosSection from '../components/Section/VideosSection'
import Loader from '../../shared/components/Loader'
import { CMSContext } from '../../context/CMSContext'
import { VideoOnDemand } from '../../api/api.interface'
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
    const [sections, setSections] = useState<Array<Section> | null>(null)
    const [loadingVodFiles, setLoadingVodFiles] = useState<boolean>(false)

    const { api } = useContext(CMSContext)

    useEffect(() => {
        ;(async () => {
            setLoadingVodFiles(true)
            try {
                const fetchedData = await api.fetchVodFiles(null, true)
                const assets = fetchedData.data
                setVodAssets(assets)
            } catch (error) {
                console.error('videos.tsx(fetchVodFiles):', error)
            }
            setLoadingVodFiles(false)
        })()
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                const data: Array<Section> = await api.fetchSections()
                setSections(data)
            } catch (error) {
                console.error('videos.tsx(fetchSections)', error)
            }
        })()
    }, [])

    return (
        <Container>
            {loadingVodFiles ? (
                <Loader />
            ) : (
                <OverflowContainer>
                    {sections?.map((_section) => {
                        return (
                            <VideosSection
                                key={_section.id}
                                section={_section.attributes.Name}
                                vodAssets={vodAssets}
                            />
                        )
                    })}
                </OverflowContainer>
            )}
        </Container>
    )
}

export default VideoPage
