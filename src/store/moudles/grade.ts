import {action,observe} from 'mobx'


// 引入获取试题的请求
import {getRoom, getClass,getMessage,deleteRoom,addSiti} from '@/service/grade'
class Room {
    
    @action public async getRoom(params:any):Promise<any>{
        const result:any=await getRoom(params)
     
        if(result.code===1){
            return result.data
        }
    }
    @action public async getClass(params:any):Promise<any>{
        const result:any=await getClass(params)
     
        if(result.code===1){
            return result.data
        }
    }
    @action public async getMessage(params:any):Promise<any>{
        const result:any=await getMessage(params)
        console.log(result)
        return result.data
    }
    @action public async deleteRoom(params:any):Promise<any>{
        return await deleteRoom({data:params})
      
    }

    @action public async addSiti(params:any):Promise<any>{
        const result:any=await addSiti(params)
       return result.data
    }
}
export default Room