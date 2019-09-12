import * as React from 'react';
// import Typeitem from '@/component/typeitem'
import * as moment from "moment"
import { inject, observer } from 'mobx-react'
import { Input, Button, Select, DatePicker, InputNumber } from 'antd'
import './examadd.css'
const { Option } = Select;
const { RangePicker } = DatePicker;
import {withRouter} from 'react-router-dom'
interface Props {
  question: any,
  value: any,
  result: any,
  typelist_bot: any,
  subject: any,
  top_list: any,
  values: any,
  showTime: boolean,
  getexam: any,
  user: any,
  history:any
}
@inject('question', 'subject', 'getexam', 'user')
@observer
class Addexam extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.getList()
  }
  public state = {
    typelist_bot: [],
    typelist: [],
    top_list: [],
    subject_id: '',
    exam_id: '',
    title: '',
    user_id: '',
    number:Number,
    startValue: moment().startOf('day'),
    endValue: moment().startOf('day'),
    endOpen: false,
  }
  public disabledStartDate = (startValue: any) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };
  public disabledEndDate = (endValue: any) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };
  public onChange = (field: any, value: any) => {
    this.setState({
      [field]: value,
    });
  };
  public onStartChange = (value: any) => {
    this.onChange('startValue', value);
  };
  public onEndChange = (value: any) => {
    this.onChange('endValue', value);
  };
  public handleStartOpenChange = (open: any) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };
  public handleEndOpenChange = (open: any) => {
    this.setState({ endOpen: open });
  };
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
  // 试卷标题
  public changeInput = (e: any) => {
    const { title } = this.state
    this.setState({
      title: e.target.value
    })
  }
  // 考试类型的id
  public typeid = (value: any) => {
    this.setState({
      exam_id: value
    })
  }
  // 学科id
  public subjectid = (value: any) => {
    this.setState({
      subject_id: value
    })
  }
  // number
  public changenumber=(value:any)=>{
    this.setState({
      number:value
    })
  }
  // 创建试卷
  public createText = async () => {
    const userinfo = await this.props.user.usermsg()
    this.setState({
      user_id: userinfo.data.user_id
    })
    const { subject_id, exam_id, title, startValue, endValue, user_id ,number} = this.state
    let start_time = +moment(startValue).format('x')
    let end_time = +moment(endValue).format('x')
    const params = { subject_id, exam_id, title, start_time, end_time, user_id ,number}
    const createresult = await this.props.getexam.createExam(params)
    console.log(createresult)
    console.log(this.props)
    this.props.history.push({
      pathname:'/home/exam/edit',
      state:params
    })
  }



  public render() {
    const { typelist, top_list, title, startValue, endValue, endOpen,number } = this.state
    return (
      <div className="add_exam">
        <h2>添加考试</h2>
        <div className="add_content">
          <p>考试名称：</p>
          <Input className="text" value={title} onChange={this.changeInput} />
          <p>请选择考试类型:</p>
          <Select defaultValue="" style={{ width: 200 }} className="select" onChange={this.typeid}>
            {typelist.length && typelist.map((item: any) => <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>)}
          </Select>
          <p>请选择课程类型:</p>
          <Select defaultValue="" style={{ width: 200 }} className="select" onChange={this.subjectid}>
            {top_list.length && top_list.map((item: any, index) => <Option value={item.subject_id} key={index}> {item.subject_text}</Option>)}
          </Select>
          <p>设置题量</p>
          <InputNumber min={1} max={10}  onChange={this.changenumber}/>
          <p>考试时间</p>

          <div>
            <DatePicker
              disabledDate={this.disabledStartDate}
              // showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={startValue}
              placeholder="Start"
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
            />
            <DatePicker
              disabledDate={this.disabledEndDate}
              // showTime  
              format="YYYY-MM-DD HH:mm:ss"
              value={endValue}
              placeholder="End"
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
            />

          </div>

          <Button className="add_text" onClick={this.createText}>创建试卷</Button>
        </div>

      </div>
    )
  }

}
export default withRouter(Addexam)