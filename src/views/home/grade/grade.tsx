import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Table, Divider, Tag,Button,Modal ,Input} from 'antd';
const { Column, ColumnGroup } = Table;
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
const data:any = []
interface Props {
  getclass: any
}
@inject('getclass')
@observer

class Gread extends React.Component<Props> {
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
  public render() {
    const { list } = this.state
    {list.map((item:any)=>{
      data.push({
        key: item.grade_id,
        name: item.grade_name,
        age: item.subject_text,
        address:item.room_text,
        domain:"修改|删除"
    });
    })}
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
          <Input placeholder="请输入类型名称" />

        </Modal>
        <Table columns={columns}   dataSource={data}/>
      </div>
    );
  }
}
export default Gread