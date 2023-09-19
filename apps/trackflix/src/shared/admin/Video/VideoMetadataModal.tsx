import React from 'react'
import { Button } from 'react-admin'
import { Modal, Typography, Box, TextareaAutosize } from '@mui/material'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
}

interface VideoMetadataModalProps {
    open: boolean
    onClose: () => void
    metadata: string
}

const VideoMetadataModal = ({
    open,
    onClose,
    metadata,
}: VideoMetadataModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h3">
                    Metadata
                </Typography>
                <TextareaAutosize
                    aria-label="metadata"
                    minRows={3}
                    maxRows={12}
                    style={{ width: 400 }}
                    value={JSON.stringify(JSON.parse(metadata), null, 2)}
                />
                <Button label={'Close'} onClick={onClose} />
            </Box>
        </Modal>
    )
}

export default VideoMetadataModal
