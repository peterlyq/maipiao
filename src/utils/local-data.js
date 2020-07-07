import axios from "axios"
export const getCityId = ()=>{
    let cityId = localStorage.getItem('cityId')
    return cityId ? cityId : ''
}

export const setCityId = (val) =>{
    return localStorage.setItem('cityId',val)
}

export const getCityName = ()=>{
    let cityName  = localStorage.getItem('cityName')
    return cityName ? cityName : ''
}

export const setCityName = (val)=>{
    return localStorage.setItem('cityName',val)
}
export const getCinemaList = ()=>{
    let cityName  =localStorage.getItem('cinemaList')
    return cityName ? cityName : ''
}

export const setCinemaList = (val)=>{
    
    return localStorage.setItem('cinemaList',val)
}
export const setCookie =  (key, value, option)=> {
    var str = key + '=' + encodeURIComponent(value);
    console.log(option,str)
    if (option) {
      if (option.expires) {
        var date = new Date();
        date.setDate(date.getDate() + option.expires);
        str += ';expires=' + date.toUTCString();
      }
      if (option.path) {
        str += ';path=' + option.path;
      }
      if(option.day){
        str += ';day=' + option.day;
      }
    }
    document.cookie = str
  }
export const getCookie =(key)=> {
    var str = document.cookie;
    var arr = str.split('; ');
    var obj = {};
    arr.forEach(item => {
      var subArr = item.split('=');
      obj[subArr[0]] = decodeURIComponent(subArr[1]);
    })
    return obj[key];
  }
export const delCookie = (key)=>{
  setCookie(key, "", -1);
}
export const getSeat = (room_id)=>{
  return axios.get('http://localhost:8082/html/Seat?id='+room_id)
}
export const payNow = (user_id,pay_key,orderNo,totalMoney,chooseList,goods_name)=>{
  return axios.post('http://localhost:8082/html/pay',{user_id,pay_key,orderNo,totalMoney,chooseList,goods_name})
}
export const getOrder = (user_id)=>{
  return axios.get('http://localhost:8082/html/orderList?user_id='+user_id)
}
export const delOrder = (id)=>{
  return axios.post('http://localhost:8082/html/delOrder',{id})
}
export const add = (id,all)=>{
  return axios.post('http://localhost:8082/html/addMoney',{id,all})
}
export const getCinemas = (cityId)=>{
  return axios.get('http://localhost:8082/html/cinemas?cityId='+cityId)
}
export const getCenima = (id)=>{
  return axios.get('http://localhost:8082/html/cinemaInfo?id='+id)
}
export const createOrderNo = function random_No(j) {
  var random_no = "";
  for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
  {
      random_no += Math.floor(Math.random() * 10);
  }
  random_no = new Date().getTime() + random_no;
  return random_no;
};

