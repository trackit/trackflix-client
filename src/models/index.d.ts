export enum Source {
    SELF = 'SELF',
    YOUTUBE = 'YOUTUBE',
    LIVESTREAM_SELF = 'LIVESTREAM_SELF',
}

type MediaMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt'
}

type MediasSectionsMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt'
}

type SectionMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt'
}

type ThumbnailMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt'
}

type ContentSubmissionMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt'
}

type VideoOnDemandMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt'
}

type LivestreamMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt'
}

export interface Media {
    id: string
    title: string
    description: string
    highlighted: boolean
    sections?: (MediasSections | null)[]
    source?: Source | keyof typeof Source
    thumbnail?: Thumbnail
    author: string
    viewCount?: number
    createdAt?: string
    updatedAt?: string
}

export interface MediasSections {
    id: string
    section: Section
    media: Media
    createdAt?: string
    updatedAt?: string
}

export interface Section {
    id: string
    attributes: SectionAttributes
}

export interface SectionAttributes {
    Name: string
    createdAt: string
    updatedAt: string
}

export interface Thumbnail {
    id: string
    ext: string
    src?: string
    createdAt?: string
    updatedAt?: string
}

export interface ContentSubmission {
    id: string
    title?: string
    description?: string
    comment?: string
    source?: Source | keyof typeof Source
    src?: string
    email?: string
    createdAt?: string
    updatedAt?: string
}

export interface VideoOnDemand {
    id: string
    media?: Media
    src?: string
    createdAt?: string
    updatedAt?: string
}

export interface Livestream {
    id: string
    media?: Media
    url?: string
    isLive?: boolean
    createdAt?: string
    updatedAt?: string
}
