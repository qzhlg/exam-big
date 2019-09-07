import {observable,action} from 'mobx'
// 引入获取试题的请求
import {getQuestion,addText} from '@/service/question'
class Question {
    // 获取试题
    @action public async getQuestion(params:any):Promise<any>{
        const result:any=await getQuestion(params)
        console.log('result---',result)
        if(result.code===1){
            return result.data
        }
    }
    @action public async addText(params:any):Promise<any>{
        const result:any=await addText(params)
        console.log(result)
        if(result.code===1){
            return result.data
        }
       
    }
}
export default Question