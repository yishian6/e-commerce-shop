<script setup>
import { reactive, onMounted, ref, isReactive } from 'vue'
import { getCategoryFilterApi, getSubCategoryApi } from '@/apis/category.js'
import { useRoute } from 'vue-router';
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
// 获取面包屑导航数据
const filterData = reactive({
    data: {}
})
const route = useRoute()
const getFilterData = async () => {
    const res = await getCategoryFilterApi(route.params.id)
    filterData.data = res.result
}
//定义请求的数据
const reqData = reactive({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})

// 获取商品列表的数据
let goodsList = reactive([])
// 调用axios获取数据
const getGoodsList = async () => {
    const res = await getSubCategoryApi(reqData)
    goodsList.splice(0, goodsList.length, ...res.result.items)
}

// tabchange切换tab的回调函数
const tabChange = () => {
    reqData.page = 1
    getGoodsList()
}
let disabled = ref(false)
// 无限加载
const load = async () => {
    reqData.page++
    const res = await getSubCategoryApi(reqData)
    goodsList.push(...res.result.items)
    console.log(isReactive(goodsList))
    // 当数据全部返回时，停止监听
    if (res.result.items.length === 0) {
        disabled.value = true
    }
}
onMounted(() => {
    getFilterData()
    getGoodsList()
})
</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${filterData.data.parentId}` }">{{ filterData.data.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ filterData.data.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container" @tab-change="tabChange">
            <el-tabs v-model="reqData.sortField">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <!-- 使用了element-plus来实现无限加载数据 -->
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->
                <GoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>