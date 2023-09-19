import React, { useState } from 'react'
import { LocalizationProvider, DateTimePicker } from '@mui/lab'
import { Modal, Box, Typography, Button, TextField } from '@mui/material'
import { toInteger } from 'lodash'
import { DateTime } from 'luxon'
import styled from 'styled-components'
import DateAdapter from '@mui/lab/AdapterLuxon'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const InputContainer = styled.div`
    & > * {
        margin: 12px !important;
    }
`

const DatePickerWrapper = styled.div`
    div.MuiOutlinedInput-root.MuiInputBase-root {
        height: 50px;
        padding: 12px 16px;
        width: 230px;
    }
`

interface ISecureLinkModal {
    open: boolean
    onClose: () => void
    onSubmit: (
        numberDownloads: number,
        expirationDate: DateTime | null,
        email: string
    ) => string
}

const SecureLinkModal = ({ open, onClose, onSubmit }: ISecureLinkModal) => {
    const [numberDownloads, setNumberDownloads] = useState(1)
    const [expirationDate, setExpirationDate] = useState<DateTime | null>(
        DateTime.now().plus({ minutes: 10 })
    )
    const [email, setEmail] = useState('')
    const [securedLink, setSecuredLink] = useState<string>()

    const handleSubmit = async () => {
        const link = await onSubmit(numberDownloads, expirationDate, email)
        setSecuredLink(link)
    }

    const handleClose = () => {
        setSecuredLink('')
        onClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Secure link settings
                </Typography>
                <InputContainer>
                    <TextField
                        label="Number of downloads"
                        variant="filled"
                        type="number"
                        value={numberDownloads}
                        onChange={(e) =>
                            setNumberDownloads(toInteger(e.target.value))
                        }
                    />
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePickerWrapper>
                            <DateTimePicker
                                label="Expiration date"
                                value={expirationDate}
                                minDate={DateTime.now().plus({ minutes: 5 })}
                                onChange={(newValue) => {
                                    setExpirationDate(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </DatePickerWrapper>
                    </LocalizationProvider>
                    <TextField
                        label="Email for notifications"
                        variant="filled"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        variant="outlined"
                        onClick={handleSubmit}
                        disabled={!!securedLink}
                    >
                        Create secure link
                    </Button>
                    {!!securedLink && (
                        <TextField
                            label="Secured Link"
                            variant="filled"
                            value={securedLink}
                            style={{
                                display: 'block',
                                margin: '12px 0',
                                width: '300px',
                            }}
                            InputProps={{ readOnly: true }}
                        />
                    )}
                </InputContainer>
            </Box>
        </Modal>
    )
}

export default SecureLinkModal
