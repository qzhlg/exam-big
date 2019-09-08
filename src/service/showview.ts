import request from '@/utils/request'
// 视图权限
export let getViews=()=>{
    return request.get('/user/view_authority')
}