import moment from 'moment'
import {
    fetchMedias,
    fetchMedia,
    modifyMedia,
    uploadContent,
    removeMedia,
    updateThumbnail,
    fetchSections,
    fetchSection,
    modifySection,
    createNewSection,
    removeSection,
} from '../api'
import * as APIt from '../../API'

const videosSort =
    (sort: { field: string; order: 'ASC' | 'DESC' }) =>
    (aM: APIt.Media, bM: APIt.Media) => {
        const a = aM as Record<string, unknown>
        const b = bM as Record<string, unknown>
        if (typeof a[sort.field] === 'string') {
            if (moment(a[sort.field] as string, 'MM/DD/YYYY', true).isValid())
                return moment(a[sort.field] as string, 'MM/DD/YYYY', true).diff(
                    moment(b[sort.field] as string, 'MM/DD/YYYY', true)
                )
            else
                return (b[sort.field] as string).localeCompare(
                    a[sort.field] as string
                )
        } else if (typeof a[sort.field] === 'number') {
            const aVal = (a[sort.field] as number) || 0
            const bVal = (b[sort.field] as number) || 0
            return bVal - aVal
        }
        return 0
    }

const resourcesMap = {
    Videos: {
        getList: (resource, params) =>
            fetchMedias().then(({ data }) => {
                const { pagination, sort } = params
                if (!data || !data.listMedia || !data.listMedia.items)
                    return { data: [], total: 0 }
                let list = data.listMedia.items
                    .filter((item) => item.source !== 'LIVESTREAM_SELF')
                    .map((item) => ({ ...item, sections: [] }))
                list.sort(videosSort(sort))
                if (sort.order === 'DESC') list = list.reverse()
                const slice = list.slice(
                    (pagination.page - 1) * pagination.perPage,
                    pagination.page * pagination.perPage
                )
                return {
                    data: slice,
                    total: list.length,
                }
            }),
        getOne: (params) =>
            fetchMedia(params.id).then((response) => ({
                data: response,
            })),
        update: (params) => {
            const promiseList = []
            if (params.data.thumbnail.rawFile) {
                promiseList.push(
                    updateThumbnail(
                        params.previousData.thumbnail,
                        params.previousData.id,
                        params.data.thumbnail.rawFile
                    )
                )
            }
            promiseList.push(
                modifyMedia({
                    id: params.data.id,
                    title: params.data.title,
                    description: params.data.description,
                    highlighted: params.data.highlighted,
                    source: params.data.source,
                    author: params.data.author,
                    sections:
                        params.data.sections.length > 0 &&
                        params.data.sections[0].id
                            ? params.data.sections.map((item) => item.id)
                            : params.data.sections,
                }).then(({ data }) =>
                    data && data.updateMedia
                        ? { data: data.updateMedia }
                        : { data: {} }
                )
            )
            return Promise.all(promiseList).then((res) => res.at(-1))
        },
        create: (params) => {
            let youtubeID = ''
            if (params.data.source === 'YOUTUBE') {
                const url = new URL(params.data.url)
                const urlParams = new URLSearchParams(url.search)
                youtubeID = urlParams.get('v')
            }
            return uploadContent(
                {
                    id: '',
                    title: params.data.title,
                    description: params.data.description
                        ? params.data.description
                        : '',
                    highlighted: params.data.highlighted
                        ? params.data.highlighted
                        : false,
                    author: params.data.author,
                },
                'SELF',
                params.data.sections,
                params.data.source === 'YOUTUBE'
                    ? null
                    : params.data.thumbnail.rawFile,
                params.data.source === 'YOUTUBE'
                    ? null
                    : params.data.video.rawFile,
                params.data.source === 'YOUTUBE'
                    ? `https://youtube.com/embed/${youtubeID}`
                    : '',
                params.data.progress
            )
        },
        delete: (params) =>
            removeMedia({ id: params.id }, params.previousData).then(
                ({ data }) => ({
                    data: data?.deleteMedia,
                })
            ),
        deleteMany: (params) =>
            Promise.all(
                params.ids.map((id) =>
                    removeMedia({ id: id }).then(
                        ({ data }) => data?.deleteMedia
                    )
                )
            ).then((deletedVideos) => ({ data: deletedVideos })),
    },
    Sections: {
        getList: () =>
            fetchSections().then(({ data }) =>
                data && data.listSections && data.listSections.items
                    ? {
                          data: data.listSections.items,
                          total: data.listSections.items.length,
                      }
                    : { data: [], total: 0 }
            ),
        getOne: (params) =>
            fetchSection(params.id).then(({ data }) =>
                data && data.getSection
                    ? { data: data.getSection }
                    : { data: { id: params.id } }
            ),
        update: (params) =>
            modifySection({
                id: params.data.id,
                label: params.data.label,
                description: params.data.description,
            }).then(({ data }) =>
                data && data.updateSection
                    ? { data: data.updateSection }
                    : { data: {} }
            ),
        create: (params) =>
            createNewSection(params.data.label, params.data.description).then(
                ({ data }) =>
                    data && data.createSection
                        ? { data: data.createSection }
                        : { data: {} }
            ),
        delete: (params) =>
            removeSection(params.id).then(({ data }) => ({
                data: data?.deleteSection,
            })),
        deleteMany: (params) =>
            Promise.all(
                params.ids.map((id) =>
                    removeSection(id).then(({ data }) => data?.deleteSection)
                )
            ).then((deletedVideos) => ({ data: deletedVideos })),
    },
}

export default {
    getList: (ressource, params) =>
        resourcesMap[ressource].getList(ressource, params),
    getOne: (ressource, params) => resourcesMap[ressource].getOne(params),
    update: (ressource, params) => resourcesMap[ressource].update(params),
    create: (ressource, params) => resourcesMap[ressource].create(params),
    delete: (ressource, params) => resourcesMap[ressource].delete(params),
    deleteMany: (ressource, params) =>
        resourcesMap[ressource].deleteMany(params),
}
