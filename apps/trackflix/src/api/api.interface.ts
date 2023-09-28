export interface Thumbnail {
    src: string
}

export interface VideoOnDemand {
    id: string
    title: string
    description: string
    highlighted: boolean
    thumbnail?: Thumbnail
    createdAt: string
    updatedAt: string
    src: string
}
