<script setup>
import { getNewApi } from "@/apis/home"
import { reactive, onMounted } from 'vue'
import HomePanel from "./HomePanel.vue"
const newList = reactive([])

//调用接口获取新鲜好物的数据
const getNewList = async () => {
    try {
        const response = await getNewApi()
        newList.splice(0, newList.length, ...response.result)
    } catch (error) {
        console.log(error);
    }
}

//挂载到mounted上面
onMounted(() => getNewList())
</script>

<template>
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质保证">
        <!-- 下面是插槽主体内容模版 -->
        <template #main>
            <ul class="goods-list">
                <li v-for="item in newList" :key="item.id">
                    <RouterLink :to="`/detail/${item.id}`">
                        <img :src="item.picture" alt="" />
                        <p class="name">{{ item.name }}</p>
                        <p class="price">&yen;{{ item.price }}</p>
                    </RouterLink>
                </li>
            </ul>
        </template>

    </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;

        background: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: $priceColor;
        }
    }
}
</style>