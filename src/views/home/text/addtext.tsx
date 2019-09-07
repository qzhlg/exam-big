import * as React from 'react';
import Editor from 'for-editor'
import { inject, observer } from 'mobx-react'
import './add.css'
import { Input, Button, Select, Modal } from 'antd'
const { Option } = Select;
interface Props {
  question: any,
  addtext:any,
  value: any,
  result: any,
  typelist_bot: any,
  subject: any,
  top_list: any,
  val:any,
  params:any,
  values:any
}
@inject('question', 'subject','addtext')
@observer
class Addtext extends React.Component<Props>{
  constructor(props: any) {
    super(props)
    this.getList()
  }
  public state = {
    typelist_bot: [],
    typelist: [],
    top_list: [],
    visible: false,
    questions_type_id:'',
    questions_stem:'',
    subject_id:"",
    exam_id:'',
    user_id:'',
    questions_answer:'',
    title:'',
 
  }
  
  public getList = async () => {
    const result = await this.props.question.getQuestion()
    const typeresult = await this.props.subject.getExamType()
    const subresult = await this.props.subject.getSubject()
    this.setState({
      typelist: typeresult,
      typelist_bot: result,
      top_list: subresult
    })
  }
  public showModal = () => {
    this.setState({
      visible: true,
    });
  };
  public change=(e:any)=>{
    const { title } = this.state
    this.setState({
      title:e.target.value
    })
  }
  public stemMethod=(e:any)=>{
    const { questions_stem } = this.state
    this.setState({
      questions_stem
    })
    console.log(questions_stem)
  }
  public changeexam=(value:any)=>{
    this.setState({
      exam_id:value
    })
    console.log(value)
  }
  public changeSelectsubject=(value:any)=>{
    this.setState({
      subject_id:value
    })
    console.log(value)
  }
  public changeType=(value:any)=>{
    this.setState({
      questions_type_id:value
    })
    console.log(value)
  }
  public handleOk = async (e: any) => {
    const { questions_type_id,questions_stem,subject_id,exam_id,user_id,questions_answer,title } = this.state
    const params={questions_type_id,questions_stem,subject_id,exam_id,user_id,questions_answer,title }
    const result=await this.props.addtext.addText(params)
    console.log(result)
    this.setState({
      visible: false,
    });
  };
  
  public handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };

  public render() {
    const { typelist_bot, typelist, top_list,title,questions_stem } = this.state
    
    return (
      <div className="add_box">
        <h2>添加试题</h2>
        <div className="add_content">
          <p>题目信息</p>
          <p>题干</p>
       
          <Input placeholder="请输入题目标题，不超过20个字" className="first_input" onChange={this.change} defaultValue={title}/>

          <p>题目主题:</p>
          <Editor onChange={this.stemMethod} value={questions_stem} />

          <p>请选择考试类型:</p>
          <Select defaultValue="周考一" style={{ width: 200 }} className="select" onChange={this.changeexam}>
            {typelist.length && typelist.map((item: any) => <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>)}
          </Select>
          <p>请选择课程类型:</p>
          <Select defaultValue="JavaScript上" style={{ width: 200 }} className="select"
          onChange={this.changeSelectsubject}
          >

            {top_list.length && top_list.map((item: any, index) => <Option value={item.subject_id} key={index}> {item.subject_text}</Option>)}
          </Select>
          <p>请选择题目类型：</p>
          <Select defaultValue="简答题" style={{ width: 200 }} className="select" onChange={this.changeType}>

            {typelist_bot.length && typelist_bot.map((item: any) => <Option value={item.questions_type_id} key={item.questions_type_id}>{item.questions_type_text}</Option>)}
          </Select>
          <p>答案信息</p>

          <Editor />

          <Button className="submit" onClick={this.showModal} >
            提交
          </Button>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>你确定要添加这道试题吗?</p>
            <p>真的要添加吗？</p>

          </Modal>
        </div>
      </div>
    );
  }
}
export default Addtext