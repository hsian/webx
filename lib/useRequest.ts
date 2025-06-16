import Request, { AxiosRequestConfig, ResponseType } from './http/request'

let requestInstance: Request | null = null

export type { 
    Request, 
    ResponseType,
    AxiosRequestConfig
}

export function useRequest(config?: AxiosRequestConfig<any> | undefined): Request {
    requestInstance = new Request(config)

    return requestInstance
}

export function getRequestInstance() {
    if (requestInstance) {
        return requestInstance
    }

    throw new Error('request实例尚未初始化，请先调用useHttpRequest()')
}
