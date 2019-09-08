import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Modal, Input,Table } from 'antd'
import './cluster.css'
interface Props {
  question: any,
  result: any
}
const columns=[
  {
    title: '类型ID',
    dataIndex: 'idea',
    key: 'idea',
  },
  {
    title: '类型名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'domain',
    key: 'domain',
  },
]
const data:any=[]
@inject('question')
@observer
class Textcluster extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.getList()
  }
  public state = {
    list: [],
    visible: false
  }
  // 控制对话框显示隐藏
  public showModal = () => {
    this.setState({
      visible: true,
    });
  };
  // 确定
  public handleOk = (e: any) => {

    this.setState({
      visible: false,
    });
  };
  // 取消
  public handleCancel = (e: any) => {

    this.setState({
      visible: false,
    });
  };
  
  public componentDidMount() {
    this.getList()
  }
  public getList = async () => {
   
    const result = await this.props.question.getQuestion()
    console.log(result)
    this.setState({
      list: result
    })
  }

  public render() {
    const { list } = this.state
    {list.map((item:any,index:number)=>{
      data.push({
        idea:item.questions_type_id,
        name:item.questions_type_text,
        key:index
      })
    })}
    return (
      <div className="box">
        <h2>试题分类</h2>

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
          <Table columns={columns} dataSource={data}/>
       
      </div>
    );
  }
}
export default Textcluster