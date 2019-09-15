import { observable, action } from 'mobx'

import { login, getuser, usermsg, getUserlist,getViewAuthority} from '../../service/user'
import { LoginForm, HttpType, HttpInfo } from '../../types/index'
import { setToken, removeToken } from '@/utils/index'
let account = {}
if (window.localStorage.getItem('account')) {
    account = JSON.parse(window.localStorage.getItem('account') + '')
}
class User {
    @observable public isLogin: boolean = false;
    @observable public account: any = account
    @observable public userInfo:any={}
    @observable public viewAuthority:object[]=[]
    @observable public avatar:string=''
    @action public async  login(form: any): Promise<any> {
        const result: any = await login(form);
        if (result.code === 1) {
            // 1.判断是否记住用户名和密码
            if (form.remember) {
                window.localStorage.setItem('account', JSON.stringify(form));
            } else {
                window.localStorage.removeItem('account');
            }
            // 2.判断是否七天免登录
            if (form.autoLogin) {
                setToken(result.token);
            }

            return result.code;

        }
    }
     // 退出登陆
     @action public async logout():Promise<any>{
        removeToken();
    }

    // &&&更新用户信息  
    @action public async getuser(data: object): Promise<any> {
        const result: any = await getuser(data)
        this.usermsg()
        return result
    }
    // 获取用户信息
    @action public async usermsg(): Promise<any> {
        const userInfo: any = await usermsg()
        console.log('userInfo...', userInfo);
        this.userInfo = userInfo.data;
        this.avatar = userInfo.data.avatar;
        this.getViewAuthority();
        return userInfo
        
       
    }
   // 获取用户权限
   @action public async getViewAuthority():Promise<any>{
       let viewAuthority:any=await getViewAuthority()
       console.log('viewAuthority....',viewAuthority)
       this.viewAuthority=viewAuthority.data
   }
   // 修改用户头像
   @action public changeAvatar(avatar:string):void{
       this.avatar=avatar
   }
    @action public async getUserlist(url:any):Promise<any>{
        const result:any=await getUserlist(url)
        return result.data
    }
}
export default User
