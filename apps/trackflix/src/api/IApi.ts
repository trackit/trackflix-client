import {
    VideoOnDemand,
    FetchVideoFilesResponse,
    Thumbnail,
} from './api.interface'

export interface IApi {
    fetchHighlightedVideos(): Promise<VideoOnDemand[]>
    fetchVodFiles(
        nextToken: string | null,
        fetchVodFiles?: boolean
    ): Promise<FetchVideoFilesResponse>
    fetchVodAsset(id: string): Promise<VideoOnDemand | null>
    fetchThumbnail(id: string): Promise<Thumbnail>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateAsset(id: string, record: Record<string, any>): Promise<void>
}
