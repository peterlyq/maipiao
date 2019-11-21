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
    // console.log(cityName)
 
    // cityName = JSON.parse(cityName)
    // console.log(cityName)
    return cityName ? cityName : ''
}

export const setCinemaList = (val)=>{
    
    return localStorage.setItem('cinemaList',val)
}
export const setCookie =  (key, value, option)=> {
    var str = key + '=' + encodeURIComponent(value);
    if (option) {
      if (option.expires) {
        var date = new Date();
        date.setDate(date.getDate() + option.expires);
        str += ';expires=' + date.toUTCString();
      }
      if (option.path) {
        str += ';path=' + option.path;
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