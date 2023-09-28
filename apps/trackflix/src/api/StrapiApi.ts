import { VideoOnDemand } from './api.interface'
import { IApi } from './IApi'
import { StrapiMedia } from './strapi.interface'

export class StrapiApi implements IApi {
    private readonly baseUrl: string

    private readonly token: string

    constructor({ baseUrl, token }: { baseUrl?: string; token?: string }) {
        if (!baseUrl || !token)
            throw new Error('StrapiApi: baseUrl and token are required')

        this.baseUrl = baseUrl
        this.token = token
    }

    async fetchHighlightedVideos(): Promise<VideoOnDemand[]> {
        const response = await fetch(
            `${this.baseUrl}/api/vods?filters[highlighted][$eq]=true`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        )

        const videos: StrapiMedia[] = await response
            .json()
            .then((res) => res.data)
        return videos.map((video: StrapiMedia) => ({
            id: video.id,
            title: video.attributes.Name,
            description: video.attributes.description,
            highlighted: video.attributes.highlighted,
            createdAt: video.attributes.createdAt,
            updatedAt: video.attributes.updatedAt,
            src: video.attributes.media_url,
        }))
    }
}
