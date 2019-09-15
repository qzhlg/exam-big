import {observable,action} from 'mobx'

import {getStudent,deleteStudent,studentTiao} from '@/service/student'

class Student {
    
    @action public async getStudent(params:any):Promise<any>{
        const result:any=await getStudent(params)
        if(result.code===1){
            return result.data
        }
    }
    @action public async deleteStudent(params:any):Promise<any>{
    
        return await deleteStudent({data:params})
    }
    @action public async studentTiao(params:any):Promise<any>{
        const result:any=await studentTiao(params)
        if(result.code===1){
            return result.data
        }
    }
}
export default Student


