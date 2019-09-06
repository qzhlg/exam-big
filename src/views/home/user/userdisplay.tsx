import * as React from 'react';

import { inject, observer } from 'mobx-react'
import { Button} from 'antd'
import './userdisplay.css'

interface Props {
  user:any,
  result: any
}
@inject('user')
@observer


class Userdisplay extends React.Component<Props> {
  constructor(props:any){
    super(props)
    this.getList()
  }
  public state = {
    list: [],
    current: 0,
    index:''
    
  }
  
  public componentDidMount(){
    this.getList()
  }
  public itemNav = (index: any) =>{
    this.setState({
      current: index,
    })
    console.log(index)
 }
  public getList = async () => {
    const { getuser } = this.props.user
    getuser()
    const result = await this.props.user.getuser()
    console.log(result)
    this.setState({
      list: result
    })
    
  }
    public render() {
      const {list,} =this.state
      console.log(list)
      
      return (
        <div className="box">
           <div className="userZhan">用户展示</div>
            <div  className="userBton">
           {
             list.length&&list.map((item:any,index:number)=>  
           <Button key={index}  onClick={this.itemNav }>{item.identity_text}</Button>
             )}
             </div>

             <div className="userbox">
                <div className="userSu">用户数据</div>
             <div className="userConet">
                  <span>用户名</span>
                  <span>密码</span>
                  <span>身份</span>
             </div>

             <div className="userCont"> 
                {
                   list.length&&list.map((item:any,index:number)=>
                   <div key={index} className="userTr">
                   <span>{item.user_name}</span>
                   <span>{item.user_pwd}</span>
                   <span>{item.identity_text}</span>
                 </div>
                   )
                 }
                </div>
               
              </div>    
             </div>
      );
    }
  }
export default Userdisplay
