import * as React from 'react';
import {inject,observer} from 'mobx-react'
import { Table, Divider, Tag,Button,Modal ,Input} from 'antd';
const columns = [
 
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
interface Props{
  getroom:any
}
const data:any = []
@inject('getroom')
@observer
class Room extends React.Component<Props> {
  constructor(props:any){
    super(props)
    this.getroommethod()
  }
  public state={
    list:[],
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
  public getroommethod=async()=>{
    const roomdata=await this.props.getroom.getRoom()
    console.log(roomdata)
    this.setState({
      list:roomdata
    })
  }
    public render() {
      const { list} = this.state
      {list.map((item:any)=>{
        data.push({
          key: item.room_id,
          address: item.room_text,
          domain:'删除'
      });
      })}
      return (
        <div className="box">
          <h2>教室管理</h2>
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
export default Room