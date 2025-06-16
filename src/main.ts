/// <reference types="vite/client" />
import { useCookies, useRequest, useService } from '../lib'
import { useApi } from '../lib/vue' // Ensure type declarations exist for this module

const request = useRequest()

request.setBaseUrl('https://www.aa.com/')

const apis = useService(import.meta.glob('../src/api/**/*.js', { eager: true }))

// apis['subApi.user.userById']({
//   a: 123,
// }).then(() => {}).catch(err => {
//   console.log(err)
// })

// const userApi = useApi('subApi.user.userById')

// userApi.fetch({
//   a: 123
// })

const loginApi = useApi('common.reset')

loginApi.fetch({
    a: 123,
})

/** cookies */
// const cookies = useCookies()

// cookies.setPrefix('abc')
// cookies.set('name', 'aobai')
// console.log(cookies.get('name'))

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div></div>
`
