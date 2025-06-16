export default {
    login: {
        method: 'POST',
        url: '/login',
        responseType: 'blob',
        headers: {
            aaa: 111,
        },
    },
    register: 'POST /register',
    reset: () => {
        const syncHeader = 222

        return {
            method: 'POST',
            url: '/reset',
            responseType: 'blob',
            headers: {
                bbb: syncHeader,
            },
        }
    },
}
