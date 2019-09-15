
import * as React from 'react';
import {inject,observer} from 'mobx-react'
import {Table,Select,Button} from 'antd'
const { Option } = Select;

interface Props{
    result: any,
    student:any
}
@inject('student')
@observer


class Classmate extends React.Component<Props> {
    constructor(props:any){
        super(props)
        // this.getList()
      }
      public state={
          list:[],
          visible: false,
      }
  public componentDidMount() {
        this.getList()
      }


public getList=async()=>{
 const result = await this.props.student.studentTiao()
  
  this.setState({
     list:result
  })
}


    public render() {
      const {list}=this.state
      return (
        <div className="box">
         
        <div className="m-input">
            <span>
              状态：
              {/* <Select defaultValue="" style={{ width: 200 }} >
              {list.length && list.map((item: any) => <Option value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>)}
              </Select> */}
            </span>
            <span>
              班级：
              {/* <Select defaultValue="" style={{ width: 200 }} >
               
              </Select> */}
             
            </span>
            <Button>查询</Button>
            
          </div>
      </div>
      );
    }
  }
export default Classmate