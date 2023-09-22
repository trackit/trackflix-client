import { VideoOnDemand } from '../models'
import { IApi } from './IApi'

export class StrapiApi implements IApi {
    async fetchHighlightedVideos(): Promise<VideoOnDemand[]> {
        return []
    }
}
