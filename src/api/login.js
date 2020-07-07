import request from '@/utils/request'
import axios from "axios"
export const logNow = (username, password ) =>{
    
    return axios.post('http://localhost:8082/html/login',{ username,password })

}
export const getUserInfo = (token, username ) => {

    return axios.post('http://localhost:8082/html/userInfo',{ token,username })

}
export const saveUser = (token,User)=>{
    return axios.post('http://localhost:8082/html/updateUser',{ token,User })
}
export const getCard = (token) => {
    
    return request({
        method:'get',
        url: '/gateway?k=9020178',
        headers:{
            "X-Token": token
        },  
        data: {
            xHost: 'mall.user.page.data',
        }
    })
    
}
export const getMoney = (token,id) => {
    return axios.get('http://localhost:8082/html/money?id='+id)
    // return request({
    //     method:'get',
    //     url: '/gateway?k=9020178',
    //     headers:{
    //         "X-Token": token
    //     },  
    //     data: {
    //         xHost: 'mall.asset.balance.info',
    //     }
    // })

}

export const regNow = (username, password )=>{
   return axios.post('http://localhost:8082/html/register',{ username,password })
}
export const changePass = (username,password, newpass )=>{
    return axios.post('http://localhost:8082/html/repass',{username, password,newpass })
 }
 export const changePayPass = (username,password, newpass )=>{
    return axios.post('http://localhost:8082/html/repaypass',{username, password,newpass })
 }
 
