import { VideoOnDemand } from '../models'
import { IApi } from './IApi'

export class StrapiApi implements IApi {
    private readonly endpoint: string

    private readonly token: string

    constructor(endpoint: string, token: string) {
        this.endpoint = endpoint
        this.token = token
    }

    async fetchHighlightedVideos(): Promise<VideoOnDemand[]> {
        return []
    }
}
