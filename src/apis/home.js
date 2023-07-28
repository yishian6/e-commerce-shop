import httpInstance from "@/utils/http";

/**
 * @description:获取轮播图数据
 * @param:
 * @returns 
 */
export function getBannerApi() {
    return httpInstance({
        url: "/home/banner",
        method: 'GET'
    })
}

//获取新鲜好物的数据
export function getNewApi() {
    return httpInstance({
        url: "/home/new",
        method: "GET"
    })
}

//获取人气推荐的数据
export function getHotApi() {
    return httpInstance({
        url: "/home/hot",
        method: "GET"
    })
}


/**
 * @description:获取product数据
 * @param:
 * @returns 
 */

export function getProductApi() {
    return httpInstance({
        url: '/home/goods',
        method: 'GET'
    })
}