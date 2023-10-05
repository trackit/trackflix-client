import {
    VideoOnDemand,
    FetchVideoFilesResponse,
    Thumbnail,
    ApiRecord,
} from './api.interface'
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

    private strapiMediaToVideoOnDemand(video: StrapiMedia): VideoOnDemand {
        return {
            id: video.id,
            src: video.attributes.media_url,
            createdAt: video.attributes.createdAt,
            updatedAt: video.attributes.updatedAt,
            media: {
                id: video.id,
                title: video.attributes.Name,
                description: video.attributes.description,
                highlighted: video.attributes.highlighted,
                source: 'YOUTUBE',
                author: 'Author',
                sections: video.attributes.sections,
                viewCount: parseInt(video.attributes.views),
            },
        } as VideoOnDemand
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
        return videos.map((video: StrapiMedia) =>
            this.strapiMediaToVideoOnDemand(video)
        )
    }

    async fetchVodFiles(
        nextToken: string | null
    ): Promise<FetchVideoFilesResponse> {
        const response = await fetch(
            `${this.baseUrl}/api/vods/?pagination[page]=${
                nextToken ? parseInt(nextToken) : 1
            }`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        ).then((res) => res.json())

        const videos: VideoOnDemand[] = response.data.map(
            (video: StrapiMedia) => this.strapiMediaToVideoOnDemand(video)
        )
        const { pageCount, page } = response.meta.pagination

        return {
            data: videos,
            nextToken: page < pageCount ? (page + 1).toString() : null,
        }
    }

    async fetchThumbnail(id: string): Promise<Thumbnail> {
        const response = await fetch(
            `${this.baseUrl}/api/vods/${id}?populate=Thumbnails`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        ).then((res) => res.json())
        const thumbnailObj = response.data.attributes?.Thumbnails?.data[0]
        const { createdAt, updatedAt } = thumbnailObj.attributes
        const { thumbnail } = thumbnailObj?.attributes?.formats

        return {
            id: thumbnailObj.id,
            ext: thumbnail.ext,
            src: `${this.baseUrl}${thumbnail.url}`,
            createdAt,
            updatedAt,
        }
    }

    async fetchVodAsset(id: string): Promise<VideoOnDemand | null> {
        const response = await fetch(`${this.baseUrl}/api/vods/${id}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        }).then((res) => res.json())

        const video = response.data
        if (!video) return null
        return this.strapiMediaToVideoOnDemand(video)
    }

    async updateAsset(id: string, record: any): Promise<boolean> {
        console.log(record)
        const response = await fetch(`${this.baseUrl}/api/vods/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: record,
            }),
        }).then((res) => res.json())

        return response.data ? true : false
    }
}
