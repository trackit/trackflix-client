export interface StrapiMedia {
    id: string
    attributes: {
        Name: string
        createdAt: string
        updatedAt: string
        rotation_start?: number
        rotation_end?: number
        description: string
        type?: string
        media_url: string
        highlighted: boolean
    }
}
