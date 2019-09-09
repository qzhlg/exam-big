import * as React from 'react'
import './edit.css'
import {Button} from 'antd'
interface Props{
    location:any,
  
}
class Edit  extends React.Component<Props>{
    public render(){
        const item=this.props.location.state
        const {title,start_time,end_time} = item
        // 开始的时间
        const date=new Date(start_time)
        const Y=date.getFullYear()+'-'
        const M=(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'
        const D=date.getDate()+'  '
        const h=date.getHours()+':'
        const m=date.getMinutes()+':'
        const s=date.getSeconds()
        const startDate=Y+M+D+h+m+s
        // console.log(Y+M+D+h+m+s,"qqqq")
        // 结束的时间
        const endDate=new Date(end_time)
        console.log(endDate,"1111111")
        return (
            <div className="edit_box">
                <Button>添加新题</Button>
                <div className="style_item">
                    <h2>{title}</h2>
                    <p>考试时间,监考人：刘宇 开始时间：{startDate}阅卷人:刘宇</p>
                    <span/>
                    <div/>
                    <Button className="createText">创建试卷</Button>
                </div>
            </div>
        )
    }
}
export default Edit