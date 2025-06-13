import { useCookies, useRequest } from '../'
// import { useApi } from '../';

const request = useRequest();

request.setBaseUrl('https://www.aa.com/')

// const apis = useService(import.meta.glob('../src/api/**/*.js', { eager: true }))

// console.log(apis['subApi.user.userById']({
//     a: 123,
// }))

// const userApi = useApi('subApi.user.userById')

// const userApi = useApi('common.login')

// console.log(userApi.fetch({
//   a: 123
// }))

/** cookies */
const cookies = useCookies()

cookies.setPrefix('abc')
cookies.set('name', 'aobai')
console.log(cookies.get('name'))

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div></div>
`
