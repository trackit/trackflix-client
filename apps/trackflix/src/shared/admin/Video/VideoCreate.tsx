import React, { useEffect, useState } from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    ImageInput,
    ImageField,
    FileInput,
    FileField,
} from 'react-admin'
import TagsInput from '../CustomFields/TagsInput'
import ProgressField from '../CustomFields/ProgressField'
import { fetchSections } from '../../api'

const validate = (values) => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    }
    if (!values.author) {
        errors.author = 'Required'
        return errors
    }
    if (
        values.source === 'SELF' &&
        (!values.thumbnail || !values.thumbnail.rawFile)
    ) {
        errors.thumbnail = 'Required'
    }
    if (values.source === 'SELF' && (!values.video || !values.video.rawFile)) {
        errors.video = 'Required'
    }
    if (values.source === 'YOUTUBE' && !values.url) {
        values.url = 'Required'
    }
    return errors
}

const VideoCreate = (props) => {
    const [existingSections, setExistingSections] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchSections()
                if (!data || !data.listSections || !data.listSections.items)
                    throw 'Received invalid sections list'
                const formatedSections = data.listSections.items.map(
                    (element) => ({ id: element.id, name: element.label })
                )
                setExistingSections(formatedSections)
            } catch (error) {
                console.error('Form/VideoUpload.tsx(fetchSections):', error)
            }
        })()
    }, [])

    return (
        <Create {...props} undoable={false}>
            <SimpleForm validate={validate}>
                <TextInput source="title" />
                <TextInput source="description" multiline={true} />
                <BooleanInput source="highlighted" />
                <TextInput source="author" />
                <TagsInput source="sections" choices={existingSections} />
                <ImageInput
                    source="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    multiple={false}
                >
                    <ImageField source="thumbnailBlob" title="Thumbnail" />
                </ImageInput>
                <FileInput
                    source="video"
                    label="Video"
                    accept="video/*"
                    placeholder={
                        <p>Drop a video to upload, or click to select it.</p>
                    }
                    mutiple={false}
                >
                    <FileField source="videoBlob" title="video" />
                </FileInput>
                <ProgressField source="progress" />
            </SimpleForm>
        </Create>
    )
}

export default VideoCreate
