import {observable,action} from 'mobx'
// 引入获取试题的请求
import {getAllQuestion} from '@/service/allquestion'
class Allquestion {
    // 获取试题
    @action public async getAllQuestion(params:any):Promise<any>{
        const result:any=await getAllQuestion(params)
        console.log('result---',result)
        if(result.code===1){
            return result.data
        }
    }
}
export default Allquestion