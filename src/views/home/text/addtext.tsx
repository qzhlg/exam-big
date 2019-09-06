import * as React from 'react';
import Editor from 'for-editor'
import { inject, observer } from 'mobx-react'
import './add.css'
import { Input, Button, Select } from 'antd'
const { Option } = Select;
interface Props {
  question: any,
  value: any,
  result: any,
  typelist_bot: any,
  subject: any,
  top_list: any
}
@inject('question', 'subject')
@observer
class Addtext extends React.Component<Props>{
  constructor(props: any) {
    super(props)
    this.getList()
  }
  public state = {
    typelist_bot: [],
    typelist: [],
    top_list: []
  }

  public getList = async () => {
    const { getQuestion } = this.props.question
    const { getExamType, getSubject } = this.props.subject
    getQuestion()
    getExamType()
    getSubject()
    const result = await this.props.question.getQuestion()
    const typeresult = await this.props.subject.getExamType()
    const subresult = await this.props.subject.getSubject()
    this.setState({
      typelist: typeresult,
      typelist_bot: result,
      top_list: subresult
    })
  }
  public render() {
    const { typelist_bot, typelist, top_list } = this.state
    return (
      <div className="add_box">
        <h2>添加试题</h2>
        <div className="add_content">
          <p>题目信息</p>
          <p>题干</p>
          <p>题目主题</p>
          <Input placeholder="请输入题目标题，不超过20个字" className="first_input" />


          <Editor />

          <p>请选择考试类型:</p>
          <Select defaultValue="周考一" style={{ width: 200 }} className="select">
            {typelist.length && typelist.map((item: any) => <Option value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>)}
          </Select>
          <p>请选择课程类型:</p>
          <Select defaultValue="JavaScript上" style={{ width: 200 }} className="select">

            {top_list.length && top_list.map((item: any, index) => <Option value={item.exam_name} key={index}> {item.subject_text}</Option>)}
          </Select>
          <p>请选择题目类型：</p>
          <Select defaultValue="简答题" style={{ width: 200 }} className="select">

            {typelist_bot.length && typelist_bot.map((item: any) => <Option value={item.questions_type_text} key={item.questions_type_id}>{item.questions_type_text}</Option>)}
          </Select>
          <p>答案信息</p>

          <Editor />

          <Button className="submit">提交</Button>
        </div>
      </div>
    );
  }
}
export default Addtext