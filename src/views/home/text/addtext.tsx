import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Select } from 'antd'
const { Option } = Select;

interface Props {

  subject: any,

  question: any
}
@inject('subject', 'question')
@observer

class Addtext extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.getList()
  }
  public state = {
    typelist: [],
    typelist_bot: []
  }
  public getList = async () => {
   
    const { getExamType } = this.props.subject
    const { getQuestion } = this.props.question
    getExamType()
    getQuestion()
  
    const typeresult = await this.props.subject.getExamType()
    const resulttype = await this.props.question.getQuestion()
    console.log(typeresult, resulttype)
    this.setState({
    
      typelist: typeresult,
      typelist_bot: resulttype
    })
  }
    public render() {
      return (
        <div className="box">
         this is Addtext page
        </div>
      );
    }
  }
export default Addtext