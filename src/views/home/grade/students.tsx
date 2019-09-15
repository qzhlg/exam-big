import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Table, Input, Select, Button } from 'antd'
const { Option } = Select;
import './student.css'
interface Info {
  getmessage: any,
  student:any
}
@inject('getmessage','student')
@observer
class Student extends React.Component<Info> {
  constructor(props: any) {
    super(props)   
  }
  public state = {
    list: [],
    data: [],
    columns: [
      {
        title: '姓名',
        dataIndex: 'student_name',
        key: 'student_name',
      },
      {
        title: '学号',
        dataIndex: 'student_id',
        key: 'student_id',
      },
      {
        title: '班级',
        dataIndex: 'grade_name',
        key: 'grade_name',
      },
      {
        title: '教室',
        dataIndex: 'room_text',
        key: 'room_text',
      },
      {
        title: '密码',
        dataIndex: 'student_pwd',
        key: 'student_pwd',
      },
      {
        title: '操作',
        key: 'domain',
        render: (e: any) => (
          <p>
          <span onClick={() => {
            console.log(e)
           const {student_id}=e
            this.delete(student_id)
          }}>删除</span>
        </p>
        )
      }
    ]
  }
   // 删除
   public delete=async(student_id:any)=>{
    console.log(this.props.student)
    await this.props.student.deleteStudent({student_id})
  }
  public getdata= async()=>{
    const messagedata=await this.props.getmessage.getMessage()
    this.setState({
      list: messagedata
    })
  }
  public handleSelectChange = (value: string) => {
    console.log(value);
  };
  public componentDidMount() {
    this.getdata()
  }
  public render() {
    const { list, columns, data } = this.state
    return (
      <div className="box">
        <h2>学生管理</h2>
        <div className="top_btn">
          <Input placeholder=" 请输入学生姓名" className="name" />
          <Select defaultValue="请选择教室号"
            onChange={this.handleSelectChange}
            style={{ width: 120 }}
          >
            {list.map((item: any) => <Option value="" key={item.room_id}>{item.room_text}</Option>)}
          </Select>
          <Select
            defaultValue="请选择班级名"
            onChange={this.handleSelectChange}
            style={{ width: 120, marginLeft: 20 }}
          >
            {list.map((item: any, index: number) => <Option value="" key={index}>{item.grade_name}</Option>)}
          </Select>
          <Button className="add_btns">搜索</Button>
          <Button className="add_btns" >重置</Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey={(record:any)=>{
     
          return record.card
        }}/>
        </div>
      );
    }
  }
}
export default Student