import request from '@/utils/request'
// 获取资讯信息
export const getConsult = () =>{
    return request({
        url:'/gateway?actId=ElzMZU125260',
        data:{
            xHost:'mall.act.static-page.info'
        }
    })
}
