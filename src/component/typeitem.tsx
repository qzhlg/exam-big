import * as React from 'react'
import { inject, observer } from 'mobx-react'
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

class Typeitem extends React.Component<Props> {
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
        const { typelist, top_list } = this.state
        return (
            <div className="Typeitem">
                <p>请选择考试类型:</p>
                <Select defaultValue="周考一" style={{ width: 200 }} className="select">
                    {typelist.length && typelist.map((item: any) => <Option value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>)}
                </Select>
                <p>请选择课程类型:</p>
                <Select defaultValue="JavaScript上" style={{ width: 200 }} className="select">

                    {top_list.length && top_list.map((item: any, index) => <Option value={item.exam_name} key={index}> {item.subject_text}</Option>)}
                </Select>
            </div>
        )
    }
}
export default Typeitem