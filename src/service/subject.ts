import request from '@/utils/request'

export let getSubject = (params: any) => {
   return request.get('/exam/subject', { params })
}
export let getExamType = (params: any) => {
   return request.get('/exam/examType', { params })
}
