import JSCookies from 'js-cookie'

const env = (import.meta as any).env

export default function useCookies(): typeof JSCookies & {
    setPrefix: (key: string) => void
    set: (key: string, value: string) => void
    get: (key: string) => string | undefined
    remove: (key: string) => void
    removeAll: () => void
} {
    let prefix = ''
    const cookiePools: string[] = []

    const setPrefix = (key: string) => {
        prefix = key
    }

    const checkKeyPrefix = (key: string) => {
        if (env.MODE === 'dev' && key.startsWith(prefix)) {
            throw new Error(
                `Invalid cookie key name. It cannot start with ${prefix} as ${prefix} is automatically added as the project namespace!`,
            )
        }
    }

    const set = (key: string, value: string) => {
        checkKeyPrefix(key)
        cookiePools.push(key)
        return JSCookies.set(prefix + key, value)
    }

    const get = (key: string) => {
        return JSCookies.get(prefix + key)
    }

    const remove = (key: string) => {
        return JSCookies.remove(prefix + key)
    }

    const removeAll = () => {
        if (cookiePools.length) {
            cookiePools.forEach(key => {
                remove(key)
            })
        }
    }

    return Object.assign({}, JSCookies, {
        setPrefix,
        set,
        get,
        remove,
        removeAll,
    })
}
