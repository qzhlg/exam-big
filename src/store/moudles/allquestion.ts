import {observable,action} from 'mobx'
// 引入获取试题的请求
import {getAllQuestion} from '@/service/allquestion'

class Allquestion<Props>{
    // 获取试题
    @action public async getAllQuestion(params:any):Promise<any>{
        const result:any=await getAllQuestion(params)
        console.log('result---',result)
        if(result.code===1){
            return result.data
        }
    }
    @action public async getDetail(params:any,id:any):Promise<any>{
        const result:any=await getAllQuestion(params)
        console.log('result---',result)
        if(result.code===1){
             result.data.filter((item:any,index:number)=>{
                 if(item.questions_id===id){
                     console.log('11111111',item)
                     return item
                 }
             })
        }
    }
}
export default Allquestion