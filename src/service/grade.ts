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
// 添加班级
export let addClass=(params:any)=>{
    return request.post('/manger/grade',params)
}
// 删除班级
export let deleteClass=(params:any)=>{
    return request.delete('/manger/grade/delete',{data:params})
}
// 更新班级
export let UpdateMessage=(params:any)=>{
    return request.put('/manger/grade/update',{data:params})
}
export let deleteRoom =(params:object)=>{
    return request.delete('/manger/room/delete',params)
}
export let addSiti=(params:object)=>{
    return request.post('/manger/room',params)
}
