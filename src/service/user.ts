// 引入拦截器
import request from '../utils/request';

// 登陆
export let login = (params: object)=>{
    return request.post('/user/login', params);
} 
// 用户
export let getuser=(params:object)=>{
    return request.get('/user/user',params)
}