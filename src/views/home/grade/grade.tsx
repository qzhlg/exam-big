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
    dataIndex: 'domain',
    key: 'domain',
  },
];
const data: any = []
interface Props {
  getclass: any,
  form: WrappedFormUtils
}
@inject('getclass')
@observer

class Gread extends React.Component<Props, any> {
  constructor(props: any) {
    super(props)
    this.getclassmethod()
  }
  public state = {
    list: [],
    data: [],
    visible: false
  }
  public showModal = () => {
    this.setState({
      visible: true,
    });
  };

  public handleOk = (e: any) => {

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
    this.setState({
      list: classdata
    })
  }
  public handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  public handleSelectChange = (value: string) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  public render() {
    const { list } = this.state
    // const { getFieldDecorator } = this.props.form
    {
      list.map((item: any) => {
        data.push({
          key: item.grade_id,
          name: item.grade_name,
          age: item.subject_text,
          address: item.room_text,
          domain: "修改|删除"
        });
      })
    }
    return (
      <div className="box">
        <h2>班级管理</h2>
        <Button type="primary" onClick={this.showModal} className="add_btn">
          +添加试题
        </Button>
        <Modal
          title="创建新类型"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
            <Form.Item label="班级名">
              {/* {getFieldDecorator('班级名', {
                rules: [{ required: true, message: 'Please input your 班级名!' }],
              }))} */}
              <Input placeholder="请输入班级名" />
            </Form.Item>

            <Form.Item label="教室号">
            
               <Select
                  placeholder="请选择教师号"
                  onChange={this.handleSelectChange}
                >

                  {list.map((item: any) => <Option value="" key={item.grade_id}>{item.room_text}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item label="课程名">
              {/* {getFieldDecorator('课程名', {
                rules: [{ required: true, message: 'Please select your 课程名!' }],
              })(
              
              )} */}
                <Select
                  placeholder="请选择课程"
                  onChange={this.handleSelectChange}
                >

                  {list.map((item: any) => <Option value="" key={item.grade_id}>{item.subject_text}</Option>)}
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