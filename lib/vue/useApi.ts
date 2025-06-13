import { ref } from 'vue'
import { getRequestInstance } from '../useRequest'
import { ApiFunctions, getApis } from '../useService'

export const useApi = (
    apiKey: string,
    // api: (...param: any[]) => Promise<any>,
    config?: { loading?: boolean },
) => {
    const apis: ApiFunctions = getApis()
    const api = apis[apiKey]

    if (!api) {
        throw new Error(`API does not exist`)
    }

    const requestInstance = getRequestInstance()
    const safeCodes = requestInstance.safeCodes
    const data = ref(null)
    const error = ref<Error | null>(null)
    const loading = ref(config?.loading || false)
    const code = ref(null)
    const message = ref('')

    const fetch = async (...args: Parameters<typeof api>) => {
        loading.value = true

        try {
            const result = (await api(...args)) ?? {}
            code.value = result.code
            if (safeCodes.includes(result.code) && result.data !== null) {
                data.value = result.data
                error.value = null
            } else {
                error.value = new Error(
                    result.message || result.data?.message || 'Unexpected Error!',
                )
            }

            message.value = result.message || result.data?.message || ''

            return Promise.resolve(data.value)
        } catch (err) {
            error.value = err instanceof Error ? err : new Error(String(err) || 'Unexpected Error!')
        } finally {
            loading.value = false
        }
    }

    return {
        data,
        error,
        code,
        loading,
        fetch,
        message,
    }
}

export type UseApi = ReturnType<typeof useApi>
