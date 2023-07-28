import httpInstance from "@/utils/http";


/**
 * @description: 获取商品的详细信息
 * @param {*} id 分类id 
 * @return {*}
 */
export const getGoodsApi = (id) => {
    return httpInstance({
        url: '/goods',
        method: 'GET',
        params: {
            id
        }
    })
}



/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */

export const fetchHotGoodsApi = (id, type, limit = 5) => {
    return httpInstance({
        url: "/goods/hot",
        method: "GET",
        params: {
            id, type, limit
        }
    })
}