import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import './cluster.css'
interface Props {
  question: any,
  result: any
}
@inject('question')
@observer
class Textcluster extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.getList()
  }
  public state = {
    list: []
  }
  public componentDidMount() {
    this.getList()
  }
  public getList = async () => {
    const { getQuestion } = this.props.question
    getQuestion()
    const result = await this.props.question.getQuestion()
    console.log(result)
    this.setState({
      list: result
    })
  }
  public render() {
    const { list } = this.state
    
    return (
      <div className="box">
        <h2>试题分类</h2>
        <Button type="primary">+添加试题</Button>
        <div className="content">
          <ul className='top_nav'>
            <li>类型ID</li>
            <li>类型名称</li>
            <li>类型操作</li>
          </ul>
          {list.length && list.map((item: any, index: number) => <ul key={index} className="list">
            <li>{item.questions_type_id}</li>
            <li>{item.questions_type_text}</li>
            <li>2</li>
          </ul>)}
        </div>


      </div>
    );
  }
}
export default Textcluster