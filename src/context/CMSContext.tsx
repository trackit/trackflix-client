import { IApi } from '../api/IApi'
import { StrapiApi } from '../api/StrapiApi'
import { createContext } from 'react'

export const CMSContext = createContext<{
    api: IApi
}>({
    api: new StrapiApi({
        baseUrl: process.env.REACT_APP_CMS_BASE_URL,
        token: process.env.REACT_APP_CMS_TOKEN,
    }),
})
