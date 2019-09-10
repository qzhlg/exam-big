import {observable,action} from 'mobx'

import {getStudent,deleteStudent} from '@/service/student'
class Student {
    
    @action public async getStudent(params:any):Promise<any>{
        const result:any=await getStudent(params)
        if(result.code===1){
            return result.data
        }
    }
    @action public async deleteStudent(params:any):Promise<any>{
        console.log(params)
        return await deleteStudent({data:params})
    }
}
export default Student


