import {
    VideoOnDemand,
    FetchVideoFilesResponse,
    Thumbnail,
} from './api.interface'

export interface IApi {
    fetchHighlightedVideos(): Promise<VideoOnDemand[]>
    fetchVodFiles(nextToken: string | null): Promise<FetchVideoFilesResponse>
    fetchThumbnail(id: string): Promise<Thumbnail>
}
