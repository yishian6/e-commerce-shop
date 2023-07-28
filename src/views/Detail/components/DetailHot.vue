<script setup>
import { fetchHotGoodsApi } from '@/apis/detail.js'
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router';
const props = defineProps({
    hotType: {
        type: Number
    }
})
const route = useRoute()
// 定义hotGoods商品
const hotGoods = reactive([])
// const reqData = reactive({
//     id: route.params.id,
//     type: props.hotType,
//     limit: 5
// })
// 调用HotGoods的api接口
const hotTitle = computed(() => props.hotType === 1 ? '24小时热榜' : '周热榜')
const getHotGoods = () => {
    fetchHotGoodsApi(route.params.id, props.hotType).then(res => {
        hotGoods.splice(0, hotGoods.length, ...res.result)
    }).catch(error => console.log(error))
}

onMounted(() => getHotGoods())
</script>


<template>
    <div class="goods-hot">
        <h3>{{ hotTitle }}</h3>
        <!-- 商品区块 -->
        <RouterLink to="/" class="goods-item" v-for="item in hotGoods" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;

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
}
</style>