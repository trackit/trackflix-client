import { VideoOnDemand } from './api.interface'

export interface IApi {
    fetchHighlightedVideos(): Promise<VideoOnDemand[]>
}
