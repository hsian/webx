// import { useCookies, useRequest, useService } from '../lib'
// import { useApi } from '../lib/vue' // Ensure type declarations exist for this module

import { createApp } from 'vue'
import App from './App.vue'

// const request = useRequest()

// request.setBaseUrl('https://www.aa.com/')

// const apis = useService(import.meta.glob('./api/**/*.js', { eager: true }))

// apis['subApi.user.userById']({
//   a: 123,
// }).then(() => {}).catch(err => {
//   console.log(err)
// })

// const userApi = useApi('subApi.user.userById')

// userApi.fetch({
//   a: 123
// })

// const loginApi = useApi('common.reset')

// loginApi.fetch({
//     a: 123,
// })

/** cookies */
// const cookies = useCookies()

// cookies.setPrefix('abc')
// cookies.set('name', 'aobai')
// console.log(cookies.get('name'))

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div style="width: 500px;">
//     <ui-input placeholder="请输入用户名"></ui-input>
//     <p></p>
//     <ui-input placeholder="请输入密码">
//       <i slot="prefix" class="icon icon-lock">icon</i>
//     </ui-input>
//     <p></p>
//     <ui-input disabled placeholder="请输入密码"></ui-input>
//   </div>
// `
const app = createApp(App)
app.mount('#app')
