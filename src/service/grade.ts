// 引入拦截器
import request from '@/utils/request'

// 获取试题
export let getRoom=(params:object)=>{
    return request.get('/manger/room',{params})
}
export let getClass=(params:object)=>{
    return request.get('/manger/grade',{params})
}
export let getMessage=(params:object)=>{
    return request.get('/manger/student',{params})
}
