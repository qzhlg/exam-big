import {action} from 'mobx'
import {getExamlist} from '@/service/exam'
class Getexam {
    @action public async getExamlist(params:any):Promise<any>{
        const result:any=await getExamlist(params)
        return result.exam
    }
}
export default Getexam