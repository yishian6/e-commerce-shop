<script setup>
import { getTopCategoryApi } from '@/apis/category.js';
import HomeBanner from '@/views/Home/components/HomeBanner.vue';
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
import { reactive, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
let topCategory = reactive({
    data: {}
})
const route = useRoute()

const getTopCategory = (id = route.params.id) => {
    getTopCategoryApi(id)
        .then(res => topCategory.data = res.result)
        .catch(error => console.log(error))
}

onMounted(() => getTopCategory())

// 目标:路由参数变化的时候 可以把分类数据接口重新发送
onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getTopCategory(to.params.id)
})

// watch(route, () => {
//     route.name === 'category' && getTopCategory(route.params.id), { immediate: true }
// })
</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ topCategory.data.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 轮播图 -->
            <HomeBanner :distributionSite="2" />
            <!-- 全部分类 -->
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="i in topCategory.data.children" :key="i.id">
                        <RouterLink :to="`/category/sub/${i.id}`">
                            <img :src="i.picture" />
                            <p>{{ i.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="ref-goods" v-for="item in topCategory.data.children" :key="item.id">
                <div class="head">
                    <h3>- {{ item.name }}-</h3>
                </div>
                <div class="body">
                    <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;


                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 40px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }
}
</style>