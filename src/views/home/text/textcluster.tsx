import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Modal, Input, Table } from 'antd'
import './cluster.css'
interface Props {
  question: any,
  result: any
}
const columns = [
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
const data: any = []
@inject('question')
@observer
class Textcluster extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.getList()
  }
  public state = {
    list: [],
    visible: false,
    text: '',
    sort: ''
  }
  public componentDidMount() {
    this.getList()
  }
  // 获取后台请求的数据
  public getList = async () => {
    const result = await this.props.question.getQuestion()
    result.map((item: any, index: number) => {
      item.id = index
    })
    this.setState({
      list: result
    })
    console.log(result)
  }
  // 控制input的值
  public changevalue = (e: any) => {
    const { list } = this.state
    this.setState({
      text: e.target.value,
      sort: list.length + 1
    })
  }
  // 控制对话框显示隐藏
  public showModal = () => {  
    this.setState({
      visible: true,
    });
  };
  // 确定
  public handleOk = (e: any) => {
    const { text, sort } = this.state
    const params = { text, sort }
    const addresult = this.props.question.addType(params)
    this.setState({
      visible: false
    });
  };
  // 取消
  public handleCancel = (e: any) => {
    this.setState({
      visible: false
    });
  };
  public render() {
    const { list } = this.state
    {
      list.map((item: any) => {
        data.push({
          idea: item.questions_type_id,
          name: item.questions_type_text
        })
      })
    }
    return (
      <div className="box" style={{background:'#fff'}}>
        <h2>试题分类</h2>
        <Button type="primary" onClick={this.showModal} className="add_btn">
          +添加试题
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h3>创建新类型</h3>
          <Input placeholder="请输入类型名称" onChange={this.changevalue} />
        </Modal>
        <Table columns={columns} dataSource={data} rowKey={(record: any) => {
          return record.id
        }} />
      </div>
    );
  }
}
export default Textcluster