import * as React from 'react';
import './index.css'
import Editor from 'for-editor'
import { Button, Input, Select } from 'antd'
const { Option } = Select;
import { inject, observer } from 'mobx-react'
interface Props {
    location: any,
    subject: any,
    question: any
}
@inject('subject', 'question')
@observer
class Rewrite extends React.Component<Props>{
    public state = {
        typelist: [],
        typelist_bot: [],
        top_list: [],
        val: '',
        title: ''
    }
    public getList = async () => {
        const subresult = await this.props.subject.getSubject()
        const typeresult = await this.props.subject.getExamType()
        const resulttype = await this.props.question.getQuestion()
        this.setState({
            top_list: subresult,
            typelist: typeresult,
            typelist_bot: resulttype
        })
    }
    public change = (e: any) => {
        this.setState({
            title: e.target.value
        })
    }
    public changeEditor = (value: any) => {
        this.setState({
            val: value
        })
    }
    // 提交
    public submit = async (id: any) => {
        const result = await this.props.question.Updata(id)
    }
    public componentDidMount() {
        this.getList()

    }
    public render() {
        const { typelist, top_list, typelist_bot } = this.state
        const items = this.props.location.state.item
        const { questions_stem, questions_answer, title, questions_id } = items
        console.log(items)
        return (
            <div className="rewrite_box">
                <h2>编辑试题</h2>
                <ul className="rewrite">
                    <li>题目信息：</li>
                    <Input value={title} placeholder="请输入题目标题，不超过20个字" className="ipt" onChange={this.change} />
                    <li>题目主题:</li>

                    <Editor value={questions_stem} onChange={this.changeEditor}/>
                    <li> 考试类型:</li>
                    <li>

                        <Select defaultValue="" style={{ width: 200 }} >
                            {typelist.length && typelist.map((item: any) => <Option value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>)}
                        </Select>
                    </li>
                    <li>科目类型：</li>
                    <li>

                        <Select defaultValue="" style={{ width: 200 }} className="select">
                            {top_list.length && top_list.map((item: any, index) => <Option value={item.exam_name} key={index}> {item.subject_text}</Option>)}
                        </Select>
                    </li>
                    <li>题目类型:</li>
                    <li>
                        <Select defaultValue="" style={{ width: 200 }}>
                            {typelist_bot.length && typelist_bot.map((item: any) => <Option value={item.questions_type_text} key={item.questions_type_id}>{item.questions_type_text}</Option>)}
                        </Select>
                    </li>
                    <li> 答案信息：</li>
                    <Editor value={questions_answer} />
                </ul>
                <li>
                    <Button className="submit" onChange={() => this.submit(questions_id)}>提交</Button>
                </li>
            </div>
        );
    }
}
export default Rewrite