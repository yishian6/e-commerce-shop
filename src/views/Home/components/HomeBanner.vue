<script setup>
import { getBannerApi } from '@/apis/home'
import { reactive, onMounted } from 'vue'
const props = defineProps({
    distributionSite: {
        type: Number
    }
})

const bannerUrl = reactive([])

const getBannerUrl = getBannerApi(props.distributionSite)
    .then(response => bannerUrl.splice(0, bannerUrl.length, ...response.result))
    .catch(error => console.log(error))

onMounted(() => getBannerUrl)
</script>



<template>
    <div :class="{ 'home-banner': distributionSite === 1, 'category-banner': distributionSite === 2 }">
        <el-carousel height="500px">
            <el-carousel-item v-for="url in bannerUrl" :key="url.id">
                <img :src="url.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>



<style scoped lang='scss'>
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    img {
        width: 100%;
        height: 500px;
    }
}

.category-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;

    img {
        width: 100%;
        height: 500px;
    }
}
</style>