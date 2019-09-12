// 引入拦截器
import request from '@/utils/request'

// 获取房间
export let getRoom=(params:object)=>{
    return request.get('/manger/room',{params})
}
// 获取教室
export let getClass=(params:object)=>{
    return request.get('/manger/grade',{params})
}
// 获取学生信息
export let getMessage=(params:object)=>{
    return request.get('/manger/student',{params})
}
export let deleteRoom =(params:object)=>{
    return request.delete('/manger/room/delete',params)
}
export let addSiti=(params:object)=>{
    return request.post('/manger/room',params)
}
