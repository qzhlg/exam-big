import * as React from 'react';

import { inject, observer } from 'mobx-react'
import { Button, Table } from 'antd'
import './userdisplay.css'


const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '密码',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '身份',
    dataIndex: 'address',
    key: 'address'
  },
];
const data: any = [];
interface Props {
  user: any,
  result: any
}
@inject('user')
@observer
class Userdisplay extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.getList()
  }
  public state = {
    list: [],
    index:'',
    currun:0
  }

  public componentDidMount() {
    this.getList()
  }
  public handleCli(){
    console.log('handleCli')
    // this.setState({
      
    // })
  }
  public getList = async () => {
    const result = await this.props.user.getuser()
    this.setState({
      list: result
    })
  }
  public render() {
    const { list} = this.state
    console.log(list)
    {
      list.map((item: any, index: number) => {
        data.push({
          name: item.user_name,
          age: item.user_pwd,
          address: item.identity_text,
          key:index
        })
      })
    }
    return (
      <div className="box">
        <div className="userZhan">用户展示</div>
        <div className="userBton">
          {
            list.length && list.map((item: any, index: number) =>
              <Button key={index} onClick={this.handleCli}>{item.identity_text}</Button>
            )}
        </div>
        <h2 className="userYong">用户数据</h2>
        <div>
          <Table columns={columns} dataSource={data} size="middle" />

        </div>

      </div>
    );
  }
}
export default Userdisplay
