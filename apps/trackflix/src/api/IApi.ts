import {
    VideoOnDemand,
    FetchVideoFilesResponse,
    Thumbnail,
    ApiRecord,
} from './api.interface'

export interface IApi {
    fetchHighlightedVideos(): Promise<VideoOnDemand[]>
    fetchVodFiles(nextToken: string | null): Promise<FetchVideoFilesResponse>
    fetchVodAsset(id: string): Promise<VideoOnDemand | null>
    fetchThumbnail(id: string): Promise<Thumbnail>
    updateAsset(id: string, record: any): Promise<boolean>
}
