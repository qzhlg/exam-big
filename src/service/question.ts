// 引入拦截器
import request from '@/utils/request'

// 获取试题
export let getQuestion=(params:object)=>{
    return request.get('/exam/getQuestionsType',{params})
}
// 添加试题
export let addText=(params:object)=>{
    return request.post('/exam/questions',params)
}
// 添加试题类型
export let addType=(params:object)=>{
    return request.get('/exam/insertQuestionsType',{params})
}
// 更新试题
 export let Updata=(id:any)=>{
     return request.put('/exam/questions/update',id)
 }