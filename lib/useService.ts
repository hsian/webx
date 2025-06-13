import { cloneDeep } from 'lodash-es'
import { getRequestInstance, Request } from './useRequest'

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

const serviceApis: Record<string, { method: string; url: string }> = {}
export type ApiFunctions = { [key in keyof typeof serviceApis]: (data?: any) => Promise<any> }
const apis: ApiFunctions = {}

export default function useService(files: ModuleFiles) {
    const request: Request = getRequestInstance()
    const serviceConfig = readFilesContent(files)

    for (const key in serviceConfig) {
        const apiGroup = serviceConfig[key]

        for (const apiName in apiGroup) {
            const fullName = `${key}.${apiName}`
            const [method, url] = apiGroup[apiName].split(' ')
            serviceApis[fullName] = { method, url }
        }
    }

    for (const key in serviceApis) {
        apis[key] = function(data) {
            return request.instance({
                method: serviceApis[key].method,
                url: serviceApis[key].url,
                ...(serviceApis[key].method.toLowerCase() === 'get' ? { params: data } : { data }),
            })
        }
    }

    return apis
}

export function getApis() {
    return apis
}
