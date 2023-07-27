//axios基础的封装
import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

//拦截器

//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => PromiseRejectionEvent.reject(e))

//axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    return PromiseRejectionEvent.reject(e)
})

//export default 是默认导出,export 是按需导出,ES6语法 导出Default不需要花括号
export default httpInstance