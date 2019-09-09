import request from '@/utils/request'
// 获取试卷列表
export let getExamlist=(params:any)=>{
    return request.get('/exam/exam',params)
}
// 创建试卷
export let createExam=(params:any)=>{
    return request.post('/exam/exam',params)
}