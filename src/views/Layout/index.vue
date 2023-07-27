<template>
    <LayoutNav />
    <LayoutHeader />
    <LayoutFixed />
    <RouterView />
    <LayoutFooter />
</template>

<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

//创建对象
const categoryStore = useCategoryStore()
// 就是两个子组件用同一份数据，在父组件用pinia action请求数据，两个子组件直接在store里拿数据
onMounted(() => categoryStore.getCategoryList())

</script>