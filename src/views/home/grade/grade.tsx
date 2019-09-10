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
    grade_name: '',
    room_id: '',
    subject_id: '',
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
            console.log(e, 'e')
            const { grade_id, grade_name, room_id, room_text, subject_id, subject_text } = e
            this.upDate(grade_id)
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
  public showModal = () => {
    this.setState({
      visible: true,
    });
  };

  public handleOk = async (e: any) => {
    const { grade_name, room_id, subject_id } = this.state
    const params = { grade_name, room_id, subject_id }
    await this.props.getclass.addClass(params)
    this.setState({
      visible: false
    });
  };

  public handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };
  public getclassmethod = async () => {
    const classdata = await this.props.getclass.getClass()
    classdata.map((item: any, i: number) => {
      this.setState({
        data: classdata
      })
    })
    this.setState({
      list: classdata
    })
  }

  // 删除
  public delete = async (grade_id: any) => {
    await this.props.getclass.deleteClass({ grade_id })
  }
  // 更新班级
  public upDate = async (e: any) => {
    this.showModal()
  }
  public render() {
    const { list, grade_name, data, columns } = this.state
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