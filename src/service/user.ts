// 引入拦截器
import request from '../utils/request';

// 登陆
export let login = (params: object)=>{
    return request.post('/user/login', params);
} 
// 更新用户信息
export let getuser=(data: object)=>{
    return request.put('/user/user',data)
}
// 获取用户信息
export let usermsg=()=>{
    return request.get('/user/userInfo')
}
// 获取用户权限
export let getViewAuthority=()=>{
    return request.get('/user/view_authority')
}
export let getUserlist=(url:any)=>{
    return request.get(url)
}