import React, { useState, useEffect, ReactNode, useCallback } from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    ImageInput,
    ImageField,
    FormDataConsumer,
    required,
    useEditController,
    EditProps,
    Button,
} from 'react-admin'
import TagsInput from '../CustomFields/TagsInput'
import styled from 'styled-components'
import {
    Button as MaterialButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Media } from '../../../models'
import awsvideoconfig from '../../../aws-video-exports'
import VideoPlayerComponent from '../../components/VideoPlayer'
import SecureLinkModal from './utils/VideoEditModal'
import { createNewSecuredLink, createNewSecuredLinkLog } from '../../api/mutate'
import { DateTime } from 'luxon'
import { SecuredLink, SecuredLinkLog } from '../../../API'
import { fetchSecuredLinkAuditLog, fetchSecuredLinks } from '../../api/fetch'
import { navigate } from '@reach/router'
import { fetchVideoOnDemand, fetchSections } from '../../api'
import VideoMetadataModal from './VideoMetadataModal'

const Grid = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 24px;
    width: 100%;

    @media (max-width: 768px) {
        display: block;
    }
`

const Column = ({ children }: { children: ReactNode }) => (
    <Box sx={{ width: '90% !important', display: 'block' }}>{children}</Box>
)

const EditDisplayBox = ({
    children,
    sx,
}: {
    children: ReactNode
    sx?: unknown
}) => (
    <Paper
        elevation={3}
        sx={{ padding: '16px', margin: '8px', width: '70%', ...sx }}
    >
        {children}
    </Paper>
)

interface ExistingSection {
    id: string
    name: string
}

const VideoEdit = (props: EditProps) => {
    const controlledProps = useEditController(props)
    const media: Media = controlledProps.record as Media
    if (!media) {
        navigate('/admin#/Videos')
        return <></>
    }
    const [metadata, setMetadata] = useState<string | null>(null)
    const [metadataModalOpen, setMetadataModelOpen] = useState(false)

    const openMetadataModal = () => setMetadataModelOpen(true)
    const closeMetadataModal = () => setMetadataModelOpen(false)
    const [existingSections, setExistingSections] = useState<ExistingSection[]>(
        []
    )
    const [linkModal, setLinkModal] = useState(false)
    const [securedLink, setSecuredLink] = useState<SecuredLink | null>(null)
    const [securedLinkLogs, setSecuredLinkLogs] =
        useState<SecuredLinkLog[] | null>(null)

    const s3File = `s3://${awsvideoconfig.awsInputVideo}/public/${media.id}.mp4`

    const videoProps = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `https://${awsvideoconfig.awsOutputVideo}/public/${media.id}/${media.id}.m3u8`,
                type: 'application/x-mpegURL',
            },
        ],
    }

    const createSecureLink = async (
        numberDowndloads: number,
        expirationDate: DateTime | null,
        email: string
    ): Promise<string | null> => {
        if (!expirationDate) return null

        try {
            const res = await createNewSecuredLink(
                media.id,
                numberDowndloads,
                Math.trunc(expirationDate.toUTC().toSeconds()),
                email
            )

            const newSecuredLink = res.data.createSecuredLink as SecuredLink
            await createNewSecuredLinkLog(
                newSecuredLink.mediaID,
                newSecuredLink.id,
                'Secured link created'
            )

            setSecuredLink(newSecuredLink)
            fetchSecuredLinkLogs(media.id)
            return getSecuredLinkURL(newSecuredLink)
        } catch (error) {
            console.log('Form/VideoEdit.tsx(createNewSecuredLink):', error)
        }
        return null
    }

    const getSecuredLinkURL = useCallback(
        (securedLink) =>
            `${window.location.origin}/secured-link/${securedLink.id}`,
        [securedLink]
    )

    const fetchSecuredLinkLogs = async (mediaId: string) => {
        const result = await fetchSecuredLinkAuditLog({
            mediaID: { eq: mediaId },
        })
        setSecuredLinkLogs(
            result.data.listSecuredLinkLogs.items.sort((a, b) =>
                a.createdAt.localeCompare(b.createdAt)
            )
        )
    }

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchSections()
                if (!data || !data.listSections || !data.listSections.items)
                    throw 'Received invalid sections list'
                const formatedSections = data.listSections.items.map(
                    (element) =>
                        element ? { id: element.id, name: element.label } : {}
                )
                setExistingSections(formatedSections as ExistingSection[])
            } catch (error) {
                console.error('Form/VideoUpload.tsx(fetchSections):', error)
            }

            try {
                const data = await fetchVideoOnDemand(props.id)
                setMetadata(data.data?.getVideoOnDemand?.metadata || null)
            } catch (error) {
                console.error(
                    'Form/VideoUpload.tsx(fetchVideoOnDemand):',
                    error
                )
            }
        })()
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                const result = await fetchSecuredLinks({
                    mediaID: { eq: media.id },
                })
                const securedLinks = result.data.listSecuredLinks.items
                setSecuredLink(
                    securedLinks
                        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                        .pop()
                )
            } catch (error) {
                console.error('Form/VideoEdit.tsx(fetchSecuredLinks):', error)
            }
        })()
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                fetchSecuredLinkLogs(media.id)
            } catch (error) {
                console.error(
                    'Form/VideoEdit.tsx(fetchSecuredLinkAuditLog):',
                    error
                )
            }
        })()
    }, [media])

    return (
        <Edit {...props} undoable={false}>
            <SimpleForm component={Grid}>
                <Column>
                    <VideoPlayerComponent {...videoProps} />
                    {metadata !== null ? (
                        <>
                            <VideoMetadataModal
                                open={metadataModalOpen}
                                onClose={closeMetadataModal}
                                metadata={metadata}
                            />
                            <Button
                                label="Show metadata"
                                onClick={openMetadataModal}
                            />
                        </>
                    ) : null}
                    <Box sx={{ width: '300px' }}>
                        <TextInput source="title" validate={required()} />
                        <TextInput
                            source="description"
                            multiline={true}
                            validate={required()}
                        />
                        <BooleanInput source="highlighted" />
                        <TextInput source="author" validate={required()} />
                        <TagsInput
                            source="sections"
                            choices={existingSections}
                        />
                    </Box>
                </Column>
                <Column>
                    <TextField
                        label="S3 file"
                        variant="filled"
                        value={s3File}
                        style={{
                            display: 'block',
                            margin: '12px 0',
                            width: '300px',
                        }}
                        InputProps={{ readOnly: true }}
                    />

                    <MaterialButton
                        variant="outlined"
                        onClick={() => setLinkModal(true)}
                    >
                        Create secure download link
                    </MaterialButton>
                    <SecureLinkModal
                        open={linkModal}
                        onClose={() => setLinkModal(false)}
                        onSubmit={createSecureLink}
                    />
                    <Grid
                        style={{
                            padding: '0px',
                            margin: '20px 0',
                            gridTemplateColumns: '70% 30%',
                        }}
                    >
                        <EditDisplayBox sx={{ width: '90%' }}>
                            <Typography component="h3">Audit logs</Typography>
                            {securedLinkLogs?.length
                                ? securedLinkLogs.map((log) => {
                                      const date = DateTime.fromISO(
                                          log.createdAt
                                      )
                                      return (
                                          <Typography
                                              key={log.id}
                                              component="p"
                                          >
                                              [
                                              {date.toLocaleString(
                                                  DateTime.DATETIME_SHORT
                                              )}
                                              ] : {log.message}
                                          </Typography>
                                      )
                                  })
                                : 'No logs yet...'}
                        </EditDisplayBox>
                        <EditDisplayBox sx={{ height: 'fit-content' }}>
                            <Typography component="h3">Views count:</Typography>
                            <Typography component="h4">
                                {media.viewCount ?? 0}
                            </Typography>
                        </EditDisplayBox>
                    </Grid>
                </Column>
                <FormDataConsumer>
                    {({ formData }) =>
                        formData.source === 'SELF' && (
                            <ImageInput
                                source="thumbnail"
                                label="Thumbnail"
                                accept="image/*"
                                multiple={false}
                            >
                                <ImageField
                                    source="thumbnailBlob"
                                    title="Thumbnail"
                                />
                            </ImageInput>
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Edit>
    )
}

export default VideoEdit
