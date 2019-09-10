import * as React from 'react';
import {inject,observer} from 'mobx-react'
import {Table,Input,Select,Button} from 'antd'
const { Option } = Select;
import './student.css'
interface Info{
  getmessage:any
}
const columns = [

  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '学号',
    dataIndex: 'card',
    key: 'card',
  },
  {
    title: '班级',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: '教室',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: '操作',
    dataIndex: 'domain',
    key: 'domain',
  }
];
const data:any=[]
@inject('getmessage')
@observer
class Student extends React.Component<Info> {
  constructor(props:any){
    super(props)
  }

 public state={
  list:[]
  }
  public getdata= async()=>{
    const messagedata=await this.props.getmessage.getMessage()
    console.log(messagedata)
    this.setState({
      list:messagedata
    })
  }
  public handleSelectChange = (value: string) => {
    console.log(value);
    
  };
  public componentDidMount(){
    this.getdata()
  }
    public render() {
      const { list } = this.state
      {list.map((item:any)=>{
        data.push({
          keu:item.grade_id,
          name:item.student_name,
          card:item.student_id,
          class:item.grade_name,
          room:item.room_text,
          password:item.student_pwd,
          domain:"删除"
        })
      })}
      console.log(list)
      return (
        <div className="box">
        <h2>学生管理</h2>
        <div className="top_btn">
          <Input placeholder=" 请输入学生姓名" className="name"/>
          <Select   defaultValue="请选择教室号"
           onChange={this.handleSelectChange}
           style={{ width: 120 }}
          >
            {list.map((item:any)=><Option value="" key={item.room_id}>{item.room_text}</Option>)}
          </Select>
          <Select
             defaultValue="请选择班级名"
            onChange={this.handleSelectChange}
            style={{ width: 120 ,marginLeft:20}}
          >
            {list.map((item:any,index:number)=><Option value="" key={index}>{item.grade_name}</Option>)}
          </Select>
          <Button className="add_btns">搜索</Button>
          <Button className="add_btns" >重置</Button>
        </div>
        <Table columns={columns} dataSource={data} />
        </div>
      );
    }
  }
export default Student