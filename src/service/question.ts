// 引入拦截器
import request from '@/utils/request'

// 获取试题
export let getQuestion=(params:object)=>{
    return request.get('/exam/getQuestionsType',{params})
}
