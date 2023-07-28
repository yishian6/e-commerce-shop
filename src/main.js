import './styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


// 定义全局的自定义指令
app.directive('img-lazy', {
    // vue2.0监听使用指令的DOM是否创建好，钩子函数: inserted
    // vue3.0 的指令拥有的钩子函数和组件的一样，使用指令的DON是否创建好，钩子函数: mounted,onMounted是在组合API时候使用，现在是选项
    // el：指令绑定的那个元素 img
    // binding: binding.value 指令等于号后面要绑定的表达式的值
    mounted(el, binding) {
        const { stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                console.log(el, binding.value);
                if (isIntersecting) {
                    el.src = binding.value
                    // 发现会不断触发视口检查，可以定义一个指针，触发一次之后把它关闭
                    stop()
                }
            }
        )

    }
})

