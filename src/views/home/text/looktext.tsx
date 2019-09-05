import * as React from 'react';
import { inject, observer } from 'mobx-react'
import './look.css'
import { Button, Select } from 'antd'
const { Option } = Select;

interface Props {
  allquestion: any,
  subject: any,
  result: any,
  question: any
}
@inject('allquestion', 'subject', 'question')
@observer

class Looktext extends React.Component<Props>{
  constructor(props: any) {
    super(props)
    this.getList()
  }

  public state = {
    list: [],
    top_list: [],
    typelist: [],
    typelist_bot: []
  }
  public getList = async () => {
    const { getAllQuestion } = this.props.allquestion
    const { getSubject, getExamType } = this.props.subject
    const { getQuestion } = this.props.question
    getAllQuestion()
    getSubject()
    getExamType()
    getQuestion()
    const result = await this.props.allquestion.getAllQuestion()
    const subresult = await this.props.subject.getSubject()
    const typeresult = await this.props.subject.getExamType()
    const resulttype = await this.props.question.getQuestion()
    this.setState({
      list: result,
      top_list: subresult,
      typelist: typeresult,
      typelist_bot: resulttype
    })
  }
  public render() {
    const { list, top_list, typelist, typelist_bot } = this.state
    return (
      <div className="box">

        <h2>查看试题</h2>
        <div className="top_content">
          <div className="top_cont">
            <div className="top_shang">
                 课程类型:
            </div>
           {top_list.length && top_list.map((item: any) => <span key={item.subject_id}>
              {item.subject_text}
            </span>)}
          </div>
          <div className="m-input">
            <span>
              考试类型:
              <Select defaultValue="" style={{ width: 200 }} >
                {typelist.length && typelist.map((item: any) => <Option value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>)}
              </Select>
            </span>
            <span>
              题目类型:
              <Select defaultValue="" style={{ width: 200 }}>
                {typelist_bot.length && typelist_bot.map((item: any) => <Option value={item.questions_type_text} key={item.questions_type_id}>{item.questions_type_text}</Option>)}
              </Select>
            </span>
            <span><Button>查询</Button></span>
          </div>
        </div>

        <div className="bottom_con">
          <div className="bottom_content">
            {list.length && list.map((item: any, index: number) => <div className="dev" key={index}>
              <div className="dev_left">
                <p className="dev_title">{item.title}</p>
                <ul>
                  <Button>{item.questions_type_tex}</Button>
                  <Button>{item.subject_text}</Button>
                  <Button>{item.exam_name}</Button>
                </ul>
                <p className="dev_name"> <a href="">{item.user_name}发布</a></p>
              </div>
              <div className="dev_right">
                <a href="">编辑</a>
              </div>

            </div>)}
          </div>

        </div>

      </div>
    );
  }
}
export default Looktext