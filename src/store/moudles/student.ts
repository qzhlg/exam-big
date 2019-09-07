import {observable,action} from 'mobx'

import {getStudent} from '@/service/student'
class Student {
    
    @action public async getStudent(params:any):Promise<any>{
        const result:any=await getStudent(params)
        console.log('result---',result)
        if(result.code===1){
            return result.data
        }
    }
}
export default Student


