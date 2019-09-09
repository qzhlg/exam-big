import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Table, Button, Modal, Input, Form, Select } from 'antd';

import { WrappedFormUtils } from 'antd/lib/form/Form'
const { Option } = Select;

const columns = [
  {
    title: '班级名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '课程名',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '教室号',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'domain',
    render: (e:any) => (<span>
      <a onClick={()=>{
        console.log(e,'e')
      }}>修改</a>|
      <a>删除</a>
    </span>)
  },
];
const data: any = []
interface Props {
  getclass: any,
  form: WrappedFormUtils,
  onRow: any
}
@inject('getclass')
@observer

class Gread extends React.Component<Props, any> {
  public componentDidMount(){
  this.getclassmethod()
  }
  public state = {
    list: [],
    data: [],
    visible: false,
    grade_name: '',
    room_id: '',
    subject_id: ''
  }
  // 教室名
  public changeInput = (e: any) => {
    this.setState({
      grade_name: e.target.value
    })
  }
  // 教室id
  public roomId = (value: any) => {
   
    this.setState({
      room_id: value
    })
  }
  // 课程Id
  public subjectId = (value: any) => {
    this.setState({
      subject_id: value
    })
  }
  public showModal = () => {
    this.setState({
      visible: true,
    });
  };

  public handleOk = async (e: any) => {
    const { grade_name, room_id, subject_id } = this.state
    const params = { grade_name, room_id, subject_id }
    console.log(params)
    await this.props.getclass.addClass(params)
    this.setState({
      visible: false,
    });
  };

  public handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };
  public getclassmethod = async () => {
    const classdata = await this.props.getclass.getClass()
    console.log(classdata)
    classdata.map((item: any, index: number) => {
      item.id = index
    })
    this.setState({
      list: classdata
    })
  }


  // 删除
  public delete = (record:any) => {
    console.log(record)
    console.log(columns)
  }
  public render() {
    const { list, grade_name } = this.state
    {
      list.map((item: any) => {
        data.push({
          name: item.grade_name,
          age: item.subject_text,
          address: item.room_text
        });
      })
    }
    return (
      <div className="box">
        <h2>班级管理</h2>
        <Button type="primary" onClick={this.showModal} className="add_btn">
          +添加班级
        </Button>
        <Modal
          title="创建新类型"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="班级名">

              <Input placeholder="请输入班级名" value={grade_name} onChange={this.changeInput} />
            </Form.Item>

            <Form.Item label="教室号">

              <Select
                placeholder="请选择教室号"
                onChange={this.roomId}
              >
                {list.map((item: any) => <Option value={item.room_id} key={item.room_id}>{item.room_text}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="课程名">
              <Select
                placeholder="请选择课程"
                onChange={this.subjectId}
              >
                {list.map((item: any) => <Option value={item.subject_id} key={item.grade_id}>{item.subject_text}</Option>)}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
export default Gread