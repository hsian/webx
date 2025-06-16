import { cloneDeep, isPlainObject } from 'lodash-es'
import { getRequestInstance, Request, AxiosRequestConfig } from './useRequest'

type ModuleFiles = Record<string, { default: string }>

function readFilesContent(files: ModuleFiles): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {}

    for (const key in files) {
        const module = files[key]
        const match = key.match(/^\.\.?\/([^/]+)\/(.*)\.js$/)
        const name = match ? match[2].replace(/\//g, '.') : ''
        result[name] = cloneDeep(module.default) as unknown as Record<string, string>
    }

    return result
}

const serviceApis: Record<string, AxiosRequestConfig> = {}
export type ApiFunctions = { [key in keyof typeof serviceApis]: (data?: any) => Promise<any> }
const apis: ApiFunctions = {}

export default function useService(files: ModuleFiles) {
    const request: Request = getRequestInstance()
    const serviceConfig = readFilesContent(files)

    for (const key in serviceConfig) {
        const apiGroup = serviceConfig[key]

        for (const apiName in apiGroup) {
            const apiValue: string | Record<string, any> | (() => AxiosRequestConfig) = apiGroup[apiName]
            const fullName = `${key}.${apiName}`

            if(typeof apiValue === 'string') {
                const [method, url] = apiGroup[apiName].split(' ')
                if(method && url) {
                    serviceApis[fullName] = { method, url }
                } else {
                    serviceApis[fullName] = { url }
                }
            }

            if(typeof apiValue !== 'string' && isPlainObject(apiValue)) {
                serviceApis[fullName] = apiValue
            }

            if(typeof apiValue === 'function') {
                const config = (apiValue as () => AxiosRequestConfig)()
                serviceApis[fullName] = config
            }
        }
    }

    for (const key in serviceApis) {
        apis[key] = function(data) {
            const { method, url, ...props } = serviceApis[key]

            return request.instance({
                method,
                url,
                ...(method?.toLowerCase() === 'post' ? { data } : { params: data }), // default get
                ...props
            })
        }
    }

    
    console.log(apis, 123)

    return apis
}

export function getApis() {
    return apis
}
