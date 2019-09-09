import * as React from 'react';
import { inject, observer } from 'mobx-react'
import './look.css'
import { Button, Select, Table, Divider, Tag } from 'antd'
const { Option } = Select;
// const { CheckableTag } = Tag;
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
  private dropDetail = (id: any,item:any) => {
    this.props.history.push({
      pathname:`/home/detail/id=${id}`,
      state:{id,item}
    })
  }
  // 从新编辑
  public dropRewrite=(id: any,item: any)=>{
    this.props.history.push({
      pathname:`/home/rewrite/id=${id}`,
      state:{id,item}
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
            {top_list.length && top_list.map((item: any) => <span key={item.subject_id} style={{ cursor: 'pointer' }}>
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
            <span><Button type="primary" icon="search" className="search">查询</Button></span>
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
                        onClick={()=>this.dropDetail(item.questions_id,item)}
                    >
                      <span>
                        {item.questions_type_text}
                      </span>
                      <span>{item.subject_text}</span>
                      <span>{item.exam_name}</span>
                    </p>
                    <span
                      className="write-box"
                      onClick={()=>this.dropRewrite(item.questions_id,item)}
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