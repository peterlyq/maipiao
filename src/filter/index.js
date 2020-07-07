export const filterActors = (arr)=>{
    if(!arr)return "暂无演员"
    let str = ""
    arr.forEach(item => {
        str += item.name + ' '
    });
    return str
}
export const changeTime = (arr)=>{
    let str ="",month="",day="",week="", today = "",weeks=['周日','周一','周二','周三','周四','周五','周六',]
    today = new Date().getUTCDate()
    day = new Date(parseInt(arr) * 1000).getUTCDate()+1
    week = new Date(arr*1000).getDay()
    month = new Date(parseInt(arr) * 1000).getUTCMonth() + 1;
    if(today == day){
        str ="今天"+month + "月" +day+ "日"
    }else if(day == today+1){
        str ="明天"+month + "月" +day+ "日"
    }
    else if(day == today+2){
        str ="后天"+month + "月" +day+ "日"
    }else{
        str = weeks[week]+month + "月" +day+ "日"
    }
    return str
}
export const getScheduleTime = (arr)=>{
    let str = new Date(arr*1000).getHours() + ':' + new Date(arr*1000).getMinutes()
    return str
}
export const turnDate = (arr)=>{
    let year = 0, month = 0, day = 0;
    year= new Date(arr*1000).getUTCFullYear()
    month = new Date(arr*1000).getMonth()+1
    month = month>=10?month:'0'+month
    day = new Date(arr*1000).getDate()
    let str = year+"-"+ month +"-"+ day
    return str
}