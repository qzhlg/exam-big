import request from '@/utils/request'
export let getExamlist=(params:any)=>{
    return request.get('/exam/exam',params)
}