import {observable,action} from 'mobx'
// 引入获取试题的请求
import {getQuestion} from '@/service/question'
class Question {
    // 获取试题
    @action public async getQuestion(params:any):Promise<any>{
        const result:any=await getQuestion(params)
        console.log('result---',result)
        if(result.code===1){
            return result.data
        }
    }
}
export default Question