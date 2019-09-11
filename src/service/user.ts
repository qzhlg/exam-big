// 引入拦截器
import request from '../utils/request';

// 登陆
export let login = (params: object)=>{
    return request.post('/user/login', params);
} 
// 用户数据
export let getuser=(params:object)=>{
    return request.get('/user/user',params)
}
// 获取用户信息
export let usermsg=()=>{
    return request.get('/user/userInfo')
}

export let getUserlist=(url:any)=>{
    return request.get(url)
}