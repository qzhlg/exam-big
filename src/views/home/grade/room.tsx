import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Table, Button, Modal, Input, Select } from 'antd';
const { Option } = Select;

interface Props {
  getroom: any
}
@inject('getroom')
@observer
class Room extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.getroommethod()
  }
  public state = {
    list: [],
    visible: false,
    data: [],
    room_text: '',
    columns: [
      {
        title: '教室号',
        dataIndex: 'room_text',
        key: 'room_text',
      },
      {
        title: '操作',

        key: 'domain',
        render: (test: any) => (
          <p>
            <span onClick={() => {
              const { room_id } = test
              this.delete(room_id)
            }}>
              删除
            </span>
          </p>
        )
      },
    ]
  }
  // 控制对话框显示隐藏
  public showModal = () => {
    this.setState({
      visible: true,
    });
  };
  // 确定
  public handleOk = (e: any) => {
    const { room_text } = this.state
    const params = { room_text }
    const addresult = this.props.getroom.addSiti(params)
    this.setState({
      visible: false,
    });
  };
  // 取消
  public handleCancel = (e: any) => {
    console.log('handleOk');
    this.setState({
      visible: false,
    });
  };
  // 控制input的值
  public changevalue = (e: any) => {
    const { room_text } = this.state
    this.setState({
      room_text: e.target.value
    })
    console.log(room_text)
  }
  // 获取后台请求的数据
  public getroommethod = async () => {
    const roomdata = await this.props.getroom.getRoom()

    roomdata.map((item: any, index: number) => {

      this.setState({
        data: roomdata
      })
    })
    this.setState({
      list: roomdata,
    })
  }
  // 删除
  public delete = async (room_id: any) => {
    await this.props.getroom.deleteRoom({ room_id })
  }



  public handleChange = (value: any) => {
    console.log(`selected ${value}`);

  }
  public render() {
    const { list, columns, data, room_text } = this.state
    return (
      <div className="box">
        <h2>教室管理</h2>
        <Button type="primary" onClick={this.showModal} className="add_btn">
          +添加教室
        </Button>
        <Modal
          title="添加班级"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>*教室号</div>
          <Input placeholder="教室号" onChange={this.changevalue} value={room_text} />

        </Modal>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
export default Room