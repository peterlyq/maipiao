import request from '@/utils/request'
import axios from 'axios'
export const getCinemaList = () =>{
    return request({
        url:'/gateway?__CITYID__&ticketFlag=1&k=2907376',
        data:{
            xHost:'mall.film-ticket.cinema.list'
        }
    })
}
export const getCinemaInfo = (params = {cid:4954}) =>{
    return request({
        url:`/gateway/?cinemaId=${params.cid}&k=218101`,
        data:{
            xHost:'mall.film-ticket.cinema.info'
        }
    })
}
export const getCinemaFilms = (params = {cid:4954}) =>{
    return request({
        url:`/gateway/?cinemaId=${params.cid}&k=1584329`,
        data:{
            xHost:'mall.film-ticket.film.cinema-show-film'
        }
    })
}
export const getCinemaSchedule = (params = {fid:4795,cid:4722,date:1570636800}) =>{
    return request({
        url:`/gateway/?filmId=${params.fid}&cinemaId=${params.cid}&date=${params.date}&k=4066711`,
        data:{
            xHost:'mall.film-ticket.schedule.list'
        }
    })
}
export const getSchedule = () =>{
    return axios.get('http://localhost:8082/html/schedule')
}