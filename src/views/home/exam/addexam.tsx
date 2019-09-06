import * as React from 'react';
// import Typeitem from '@/component/typeitem'
import { inject, observer } from 'mobx-react'
import { Input, Button, Select, DatePicker, InputNumber } from 'antd'
const { Option } = Select;
const { RangePicker } = DatePicker;
import './examadd.css'
interface Props {
  question: any,
  value: any,
  result: any,
  typelist_bot: any,
  subject: any,
  top_list: any,
  values: any,
  showTime: boolean
}

@inject('question', 'subject')
@observer
class Addexam extends React.Component<Props> {

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


  public onChange = (value: any, dateString: any) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  public onOk = (value: any) => {
    console.log('onOk: ', value);
  }



  public render() {
    console.log(this.props)
    const { typelist, top_list } = this.state
    return (
      <div className="add_exam">
        <h2>添加考试</h2>
        <div className="add_content">
          <p>考试名称：</p>
          <Input className="text"/>
          <p>请选择考试类型:</p>
          <Select defaultValue="" style={{ width: 200 }} className="select">
            {typelist.length && typelist.map((item: any) => <Option value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>)}
          </Select>
          <p>请选择课程类型:</p>
          <Select defaultValue="" style={{ width: 200 }} className="select">
            {top_list.length && top_list.map((item: any, index) => <Option value={item.exam_name} key={index}> {item.subject_text}</Option>)}
          </Select>
          <p>设置题量</p>
          <InputNumber min={1} max={10} defaultValue={3} />
          <p>考试时间</p>

          <DatePicker  placeholder="开始时间" onChange={this.onChange} onOk={this.onOk} className="date"/>
        
          <DatePicker  placeholder="结束时间" onChange={this.onChange} onOk={this.onOk} className="date"/>
          <br/>
          <Button className="add_text">创建试卷</Button>
        </div>

      </div>
    )
  }

}
export default Addexam