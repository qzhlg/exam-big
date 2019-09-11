import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Table, Button, Modal, Input, Form, Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form'
const { Option } = Select;
interface Props {
  getclass: any,
  form: WrappedFormUtils,
  onRow: any,
  delete: any
}
@inject('getclass')
@observer

class Gread extends React.Component<Props, any> {
  public componentDidMount() {
    this.getclassmethod()
  }
  public state = {

    list: [],
    data: [],
    visible: false,
    disabled: false,// 是非选中
    grade_id: '',
    grade_name: '',
    room_id: '',
    subject_id: '',
    subject_text: '',
    columns: [
      {
        title: '班级名',
        dataIndex: 'grade_name',
        key: 'grade_name',
      },
      {
        title: '课程名',
        dataIndex: 'subject_text',
        key: 'subject_text',
      },
      {
        title: '教室号',
        dataIndex: 'room_text',
        key: 'room_text',
      },
      {
        title: '操作',
        key: 'domain',
        render: (e: any) => (<span>
          <a onClick={() => {
            this.showModal(e, "reset")
          }}>修改</a>|
          <a onClick={() => {
            const { grade_id } = e
            this.delete(grade_id)
          }}>删除</a>
        </span>)
      }
    ]
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
  public showModal = (e: any, type: string) => {
    this.setState({
      visible: true,
    })
    console.log(e, '--------------------')
    if (type === "reset") {
      this.setState({
        disabled: true,// input失焦
        grade_id: e.grade_id,
        grade_name: e.grade_name, // 班级名
        room_id: e.room_id,
        subject_text: e.subject_text, // 所学课程
        subject_id: e.subject_id // 课程名
      })
    } else {
      console.log(123)
      this.setState({
        disabled: false,
        grade_id: null,
        grade_name: "请输入班级名",
        room_id: null,
        room_text: "请输入教室号",
        subject_text: "请输入所学课程",
        subject_id: null
      })
    }
  
  };

  public handleOk = async (e: any) => {
    this.setState({
      visible: false
    });
    const { grade_id } = this.state
    let params = {}
    if (this.state.grade_id) {
      console.log(1)
      params = {
        grade_id: this.state.grade_id,
        grade_name: this.state.grade_name,
        subject_id: this.state.subject_id,
        room_id: this.state.room_id
      }
      this.upData(params)
    } else {
      const { grade_name, room_id, subject_id } = this.state
      params = { grade_name, room_id, subject_id }
     this.addList(params)
    }
  
  };
  public upData=async (params:any)=>{
    let uplist= await this.props.getclass.UpdateMessage(params)
  }
  public addList=async (params:any)=>{
    let addlist=await this.props.getclass.addClass(params)
  }
  public handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };
  public getclassmethod = async () => {
    const classdata = await this.props.getclass.getClass()
    classdata.map((item: any, i: number) => {
      item.id = i
      this.setState({
        data: classdata
      })
    })
    this.setState({
      list: classdata
    })
    console.log(classdata)
  }

  // 删除
  public delete = async (grade_id: any) => {
    await this.props.getclass.deleteClass({ grade_id })
  }

  public render() {
    const { list, grade_name, data, columns, disabled } = this.state
    return (
      <div className="box">
        <h2>班级管理</h2>
        <Button type="primary" onClick={() => this.showModal} className="add_btn">
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
              <Input placeholder="请输入班级名" value={grade_name} onChange={this.changeInput} disabled={disabled} />
            </Form.Item>

            <Form.Item label="教室号">

              <Select
                placeholder="请选择教室号"
                onChange={this.roomId}
              >
                {list.map((item: any) => <Option value={item.room_text} key={item.room_id}>{item.room_text}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="课程名">
              <Select
                placeholder="请选择课程"
                onChange={this.subjectId}
              >
                {list.map((item: any) => <Option value={item.subject_text} key={item.id}>{item.subject_text}</Option>)}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={data} rowKey={(record:any)=>{
          return record.id
        }}/>
      </div>
    );
  }
}
export default Gread