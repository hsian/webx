import axios, { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import RequestCancel from './requestCancel'

export * from 'axios'

const requestCancel = new RequestCancel()

class Request extends Axios {
    public instance!: AxiosInstance
    public axiosConfig: AxiosRequestConfig
    private beforeFunction: Array<() => Promise<any>> = []
    public safeCodes: number[] = [200]

    constructor(opts: AxiosRequestConfig = {}) {
        super(opts) // Call the base class constructor with the options
        this.axiosConfig = {
            ...opts,
        }

        this.createRequest(this.axiosConfig)
    }

    createRequest(config: AxiosRequestConfig<any> | undefined) {
        this.instance = axios.create({ ...config })
        return this.instance
    }

    beforeRequest(fn: () => Promise<any>) {
        if (typeof fn === 'function') {
            this.beforeFunction.push(fn)
        }
    }

    setReqInterceptors(
        callback: (arg0: AxiosRequestConfig<any>) => void,
        fail: (arg0: any) => void,
    ) {
        this.instance.interceptors.request.use(
            config => {
                this.beforeFunction.forEach(async fn => {
                    await fn()
                })
                // requestCancel.addPending(config)
                callback(config)
                return config
            },
            error => {
                if (typeof fail === 'function') {
                    fail(error)
                }
                return Promise.reject(error)
            },
        )
    }

    setResInterceptors(
        callback: (arg0: AxiosResponse<any, any>) => any,
        fail: (arg0: any) => void,
    ) {
        this.instance.interceptors.response.use(
            response => {
                return callback(response) || response
            },
            error => {
                if (axios.isCancel(error)) {
                    return Promise.reject(error.message)
                }
                if (typeof fail === 'function') {
                    fail(error.response)
                }
                return Promise.reject(error.response)
            },
        )
    }

    setBaseUrl(url: string | undefined) {
        this.instance.defaults.baseURL = url
    }

    setHeaders(key: string | number, value: string) {
        this.instance.defaults.headers.common[key] = value
    }

    setSafeCodes(data: number[]) {
        this.safeCodes = data
    }

    cancelRequest(config: AxiosRequestConfig) {
        requestCancel.removePending(config)
    }

    cancelAllRequest() {
        requestCancel.removeAllPending()
    }
}

export default Request
