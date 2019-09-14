import {observable,action} from 'mobx'
// 引入获取试题的请求
import {getQuestion,addText,addType,Updata} from '@/service/question'
class Question {
    // 获取试题
    @action public async getQuestion(params:any):Promise<any>{
        const result:any=await getQuestion(params)
      
        if(result.code===1){
            return result.data
        }
    }
    // 添加试题
    @action public async addText(params:any):Promise<any>{
        const result:any=await addText(params)
        console.log(result)
        if(result.code===1){
            return result.data
        }
       
    }
    // 添加类型
    @action public async addType(params:any):Promise<any>{
        const result:any=await addType(params)
        return result
    }
    // 更新试题
    @action public async Updata(id:any):Promise<any>{
      
        return  await Updata(id)
    }
}
export default Question