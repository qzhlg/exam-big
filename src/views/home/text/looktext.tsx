import * as React from 'react';
import { inject, observer } from 'mobx-react'
import './look.css'
import { Button, Select } from 'antd'
const { Option } = Select;
interface Props {
  allquestion: any,
  subject: any,
  result: any,
  question: any,
  history: any
}
@inject('allquestion', 'subject', 'question')
@observer
class Looktext extends React.Component<Props>{
  public componentDidMount() {
    this.getList()
  }
  public state = {
    list: [],
    top_list: [],
    typelist: [],
    typelist_bot: [],
    acIndex: -1,
    subject_id: '',
    exam_id: '',
    questions_type_id: ''
  }
  // 获取所有数据
  public getList = async () => {
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
  // 跳详情
  private dropDetail = (id: any, item: any) => {
    this.props.history.push({
      pathname: `/home/detail/id=${id}`,
      state: { id, item }
    })
  }
  // 从新编辑
  public dropRewrite = (id: any, item: any) => {
    this.props.history.push({
      pathname: `/home/rewrite/id=${id}`,
      state: { id, item } 
    })
  }
  // 获取考试类型的id
  public changeexam = (value: any) => {
    this.setState({
      exam_id: value
    })
  }
  // 获取题目类型的id
  public changequestion = (value: any) => {
    this.setState({
      questions_type_id: value
    })
  }
  // 按条件查询
  public search = (params1: any) => {
    const { subject_id, exam_id, questions_type_id } = this.state
    let params={};
    if (subject_id && exam_id && questions_type_id) {
      params={subject_id , exam_id , questions_type_id}
      this.getDate(params)
    } else if (subject_id && exam_id) {
      params={subject_id , exam_id }
    } else if (exam_id && questions_type_id) {
      params={questions_type_id , exam_id }
    } else if (subject_id && questions_type_id) {
      params={questions_type_id , subject_id }
    } else if (subject_id) {
      params={ subject_id }
    } else if (exam_id) {
      params={ exam_id }
    } else if (questions_type_id) {
      params={ questions_type_id }
    }
    this.getDate(params)
  }
  public getDate= async(params:any)=>{
   const result= await this.props.allquestion.getAllQuestion(params)
    this.setState({
      list:result
    })
  }
  // 改变下标
  public changeIndex = (index: any, id: any) => {
    const { subject_id } = this.state
    this.setState({
      acIndex: index,
      subject_id: id
    })
    console.log(subject_id)
  }
  public render() {
    const { list, top_list, typelist, typelist_bot, acIndex } = this.state
    return (
      <div className="box">
        <h2>查看试题</h2>
        <div className="top_content">
          <div className="top_cont">
            <div className="top_shang">
              课程类型:
            </div>
            <span>all</span>
            {top_list.length && top_list.map((item: any, index: any) =>
              <span key={item.subject_id}
                style={{ cursor: 'pointer' }}
                className={acIndex === index ? 'active' : ''}
                onClick={() => this.changeIndex(index, item.subject_id)}
              >
                {item.subject_text}
              </span>)}
          </div>
          <div className="m-input">
            <span>
              考试类型：
              <Select defaultValue="" style={{ width: 200 }} onChange={this.changeexam}>
                {typelist.length && typelist.map((item: any) => <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>)}
              </Select>
            </span>
            <span>
              题目类型：
              <Select defaultValue="" style={{ width: 200 }} onChange={this.changequestion}>
                {typelist_bot.length && typelist_bot.map((item: any) => <Option value={item.questions_type_id} key={item.questions_type_id}>{item.questions_type_text}</Option>)}
              </Select>
            </span>
            <span><Button icon="search" className="search" onClick={this.search}>查询</Button></span>
          </div>
        </div>
        <div className="content_look">
          <div className="list-subject-item">
            {list &&
              list.map((item: any) => {
                return (
                  <li key={item.questions_id}>
                    <div>
                      <span>{item.title}</span>
                    </div>
                    <div>
                      <p
                        onClick={() => this.dropDetail(item.questions_id, item)}
                      >
                        <span>
                          {item.questions_type_text}
                        </span>
                        <span>{item.subject_text}</span>
                        <span>{item.exam_name}</span>
                      </p>
                      <span
                        className="write-box"
                        onClick={() => this.dropRewrite(item.questions_id, item)}
                      >
                        编辑
                         </span>
                    </div>

                    <div>
                      <span>{item.user_name}发布</span>
                    </div>
                  </li>
                );
              })}
          </div>

        </div>

      </div>
    );
  }
}
export default Looktext