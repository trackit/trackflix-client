export interface Thumbnail {
    id: string
    ext: string
    src?: string
    createdAt?: string
    updatedAt?: string
}

export enum Source {
    SELF = 'SELF',
    YOUTUBE = 'YOUTUBE',
    LIVESTREAM_SELF = 'LIVESTREAM_SELF',
}

export interface Media {
    id: string
    title: string
    description: string
    highlighted: boolean
    sections?: string[]
    source?: Source | keyof typeof Source
    thumbnail?: Thumbnail
    author: string
    viewCount: number
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

export interface FetchVideoFilesResponse {
    data: VideoOnDemand[]
    nextToken: string | null
}
