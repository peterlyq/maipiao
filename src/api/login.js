import request from '@/utils/request'
// 获取所有城市的数据
export const getMes = (phone) => {

    return request({
        method:'post',
        url: '/gateway',
        data: {
            xHost: 'mall.user.sms-code.send',
            imgCode: "",
            imgKey: "",
            mobile: phone,
            type: "1",
        }
    })

}
export const logNow = (phone,code) => {
    return request({
        method:'post',
        url: '/gateway',
        data: {
            xHost: 'mall.user.sms-code-login',
            imgCode: "",
            imgKey: "",
            mobile: phone,
            smsCode: code,
            type: "1",
        }
    })

}
export const getUserInfo = (token) => {
    
    return request({
        method:'get',
        url: '/gateway?k=9020178',
        headers:{
            "X-Token": token
        },  
        data: {
            xHost: 'mall.user.info.get',
        }
    })

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
export const getMoney = (token) => {
    
    return request({
        method:'get',
        url: '/gateway?k=9020178',
        headers:{
            "X-Token": token
        },  
        data: {
            xHost: 'mall.asset.balance.info',
        }
    })

}

