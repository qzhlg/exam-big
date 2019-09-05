import {observable,action} from 'mobx'
// 引入获取试题的请求
import {getSubject,getExamType} from '@/service/subject'
class Subject {
    // 获取试题
    @action public async getSubject(params:any):Promise<any>{
        const result:any=await getSubject(params)
        console.log('result---',result)
        if(result.code===1){
            return result.data
        }
    }
    // 获取考试类型
    @action public async getExamType(params:any):Promise<any>{
        const result:any=await getExamType(params)
        if(result.code===1){
            return result.data
        }
    }
}
export default Subject