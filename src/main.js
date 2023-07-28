import './styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)  // 使用懒加载插件
app.mount('#app')




