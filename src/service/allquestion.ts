// 引入拦截器
import request from '@/utils/request'

// 获取试题
export let getAllQuestion=(params:object)=>{
    return request.get('/exam/questions/condition',{params})
}
