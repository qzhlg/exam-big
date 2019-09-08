import {action} from 'mobx'
import {getViews} from '@/service/showview'
class Show {
    @action public async getViews():Promise<any>{
        const result:any=await getViews()
        return result
    }
}
export default Show