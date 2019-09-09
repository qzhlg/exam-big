import * as React from 'react'
import './edit.css'
import {Button} from 'antd'
interface Props{
    location:any
}
class Edit  extends React.Component<Props>{
    
    public render(){
        console.log(this.props)
        const item=this.props.location.state
        const {title,start_time,end_time} = item
        // const startTime=start_time.getDate()
        // const endTime=end_time.getDate()
        // const leng=endTime-startTime
        return (
            <div className="edit_box">
                edit
                <Button>添加新题</Button>
                <div className="style_item">
                    <h2>{title}</h2>
                    <p>考试时间,监考人：刘宇 开始时间：阅卷人:刘宇</p>
                    <span/>
                    <div/>
                    <Button className="createText">创建试卷</Button>
                </div>
            </div>
        )
    }
}
export default Edit