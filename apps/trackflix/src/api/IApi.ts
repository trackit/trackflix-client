import { VideoOnDemand } from '../models'

export interface IApi {
    fetchHighlightedVideos(): Promise<VideoOnDemand[]>
}
