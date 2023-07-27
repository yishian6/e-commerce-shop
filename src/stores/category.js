import { getCategoryApi } from '@/apis/layout'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const useCategoryStore = defineStore('category', () => {
    const categoryList = reactive([])

    //获取category后端数据
    const getCategoryList = async () => {
        await getCategoryApi()
            .then(response => categoryList.splice(0, categoryList.length, ...response.result))
            .catch(error => console.log(error))
    }


    return { categoryList, getCategoryList }
})