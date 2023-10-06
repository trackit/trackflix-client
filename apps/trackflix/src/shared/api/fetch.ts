import {
    getSection,
    listSections,
    listMedia,
    listMediasSections,
    getMediasSections,
    getSecuredLink,
    listSecuredLinks,
    listSecuredLinkLogs,
    getVideoOnDemand,
} from '../../graphql/queries'
import { callManageResourcesLambda } from './mutate'
import * as APIt from '../../API'
import { Media } from '../../models'
import { getAuthMode } from './helper'
import {
    ModelSecuredLinkFilterInput,
    ModelSecuredLinkLogFilterInput,
} from '../../API'

async function fetchSections() {
    // return API.graphql({
    //     query: listSections,
    //     authMode: await getAuthMode(),
    // }) as GraphQLResult<APIt.ListSectionsQuery>
}

async function fetchSection(id: string) {
    // return API.graphql({
    //     query: getSection,
    //     variables: { id },
    //     authMode: await getAuthMode(),
    // }) as GraphQLResult<APIt.GetSectionQuery>
}

async function fetchThumbnail(media: Media | undefined) {
    console.log('removed implementation (fetchThumbnail)')
    // return Storage.get(
    //     `thumbnails/${media?.thumbnail?.id}.${media?.thumbnail?.ext}`,
    //     {
    //         bucket: awsmobile.aws_user_files_s3_bucket,
    //         level: 'public',
    //     }
    // )
}

async function fetchMedias(nextToken: string | undefined = undefined) {
    // const res = (await API.graphql({
    //     query: listMedia,
    //     authMode: await getAuthMode(),
    //     variables: {
    //         limit: 100,
    //         nextToken: nextToken,
    //     },
    // })) as GraphQLResult<APIt.ListMediaQuery>

    // if (res.errors?.length && res.errors.length > 0) {
    //     return res
    // }

    // if (res.data?.listMedia?.nextToken) {
    //     const nextItems = (await fetchMedias(
    //         res.data.listMedia.nextToken
    //     )) as GraphQLResult<APIt.ListMediaQuery>

    //     if (nextItems.errors?.length && nextItems.errors.length > 0) {
    //         return nextItems
    //     }

    //     return {
    //         data: {
    //             listMedia: {
    //                 items: [
    //                     ...res.data?.listMedia?.items,
    //                     ...nextItems.data?.listMedia?.items,
    //                 ],
    //             },
    //         },
    //     }
    // }
    // return res
}

async function fetchMedia(id: string) {
    // try {
    //     return await callManageResourcesLambda('getMedia', { id }).then(
    //         (response) => ({
    //             ...response,
    //             sections: response.sections.map((section) => ({
    //                 title: section.label,
    //                 id: section.id,
    //             })),
    //         })
    //     )
    // } catch (error) {
    //     return { id }
    // }
}

async function fetchMediasSections() {
    // return API.graphql({
    //     query: listMediasSections,
    //     authMode: await getAuthMode(),
    // }) as GraphQLResult<APIt.ListMediasSectionsQuery>
}

async function fetchMediasSectionsFiltered(
    filter: APIt.ModelMediasSectionFilterInput
) {
    // return API.graphql({
    //     query: listMediasSections,
    //     authMode: await getAuthMode(),
    //     variables: { filter },
    // }) as GraphQLResult<APIt.ListMediasSectionsQuery>
}

async function fetchMediaSections(id: string) {
    // return API.graphql({
    //     query: getMediasSections,
    //     variables: { id },
    //     authMode: await getAuthMode(),
    // }) as GraphQLResult<APIt.GetMediasSectionsQuery>
}

async function fetchSecuredLink(id: string) {
    // return API.graphql({
    //     query: getSecuredLink,
    //     variables: { id },
    //     authMode: await getAuthMode(),
    // }) as GraphQLResult<APIt.GetSecuredLinkQuery>
}

async function fetchSecuredLinks(
    filter: ModelSecuredLinkFilterInput,
    limit?: number,
    nextToken?: string
) {
    // return API.graphql({
    //     query: listSecuredLinks,
    //     variables: {
    //         filter,
    //         ...(limit ? { limit } : {}),
    //         ...(nextToken ? { nextToken } : {}),
    //     },
    //     authMode: await getAuthMode(),
    // })
}

async function fetchSecuredLinkAuditLog(
    filter: ModelSecuredLinkLogFilterInput,
    limit?: number,
    nextToken?: string
) {
    // return API.graphql({
    //     query: listSecuredLinkLogs,
    //     variables: {
    //         filter,
    //         ...(limit ? { limit } : {}),
    //         ...(nextToken ? { nextToken } : {}),
    //     },
    //     authMode: await getAuthMode(),
    // })
}

async function fetchVideoOnDemand(id: string) {
    // return API.graphql({
    //     query: getVideoOnDemand,
    //     variables: { id },
    //     authMode: await getAuthMode(),
    // }) as GraphQLResult<APIt.GetVideoOnDemandQuery>
}

export {
    fetchSection,
    fetchSections,
    fetchThumbnail,
    fetchMedias,
    fetchMedia,
    fetchMediasSections,
    fetchMediaSections,
    fetchMediasSectionsFiltered,
    fetchSecuredLink,
    fetchSecuredLinks,
    fetchSecuredLinkAuditLog,
    fetchVideoOnDemand,
}
