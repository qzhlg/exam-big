// 引入拦截器
import request from '@/utils/request'

// 获取试题
export const getStudent=(params:object)=>{
    return request.get('/manger/grade',{params})
}
export const deleteStudent=(params:object)=>{
    return request.delete(`/manger/student/:id=${params}`)
}
export const studentTiao=(params:object)=>{
    return request.get('/exam/student',{params})
}