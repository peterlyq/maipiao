import request from '@/utils/request'
export const getFilmList = (params = {type:1,pageNum:2,pageSize:10}) =>{
    return request({
        url:'/gateway?__CITYID__&pageNum='+params.pageNum+'&pageSize='+params.pageSize+'&type='+params.type+'&k=4210892',
        data:{
            xHost:'mall.film-ticket.film.list'
        }
    })
}
export const getFilmBannerList =() =>{
    return request({
        url:`/gateway?type=2&__CITYID__&k=8049960`,
        data:{
            xHost:'mall.cfg.common-banner'
        }
    })
}
export const getFilmDetail =(params={fid:4795}) =>{
    return request({
        url:`/gateway?filmId=${params.fid}&k=1106709`,
        data:{
            xHost:'mall.film-ticket.film.info'
        }
    })
}