import {action} from 'mobx'
import {getExamlist,createExam} from '@/service/exam'
class Getexam {
    @action public async getExamlist(params:any):Promise<any>{
        const result:any=await getExamlist(params)
        return result.exam
    }
    @action public async createExam(params:any):Promise<any>{
        const result:any=await createExam(params)
        return result
    }
}
export default Getexam