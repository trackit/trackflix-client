import React from 'react'
import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin'
import ThumbnailField from '../CustomFields/ThumbnailField'
import EllipsisTextField from '../CustomFields/EllipsisTextField'
import { useWindowDimensions } from '../../hooks'

const VideoList = (props) => {
    const size = useWindowDimensions()

    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <ThumbnailField source="thumbnail" sortable={false} />
                <EllipsisTextField source="title" width="125px" />
                <EllipsisTextField source="description" width="125px" />
                <TextField source="author" />
                <BooleanField source="highlighted" sortable={false} />
                {size.width > 1450 && (
                    <TextField source="viewCount" label="Views" />
                )}
                {size.width > 1600 && <DateField source="createdAt" />}
                {size.width > 1700 && <DateField source="updatedAt" />}
            </Datagrid>
        </List>
    )
}

export default VideoList
