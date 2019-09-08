import * as React from 'react';
import {inject,observer} from 'mobx-react'
import {Button,Table,Select} from 'antd'
const { Option } = Select;
import './textlist.css'
interface Info{
  getexam:any,
  top_list: any,
  subject:any,
  typelist:any
}
const columns = [
  {
    title: '试卷信息',
    dataIndex: 'mesg',
    key: 'mesg',
  },
  {
    title: '班级',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: '创建人',
    dataIndex: 'creatperson',
    key: 'creatperson',
  },
  {
    title: '开始时间',
    dataIndex: 'starttime',
    key: 'starttime',
  },
  {
    title: '结束时间',
    dataIndex: 'endtime',
    key: 'endtime',
  },
  {
    title: '操作',
    dataIndex: 'domain',
    key: 'domain',
  }
];
const data: any = []
@inject('getexam','question', 'subject')
@observer
class Textlist extends React.Component<Info> {
  public state={
    examlist:[],
    top_list:[],
    typelist:[]
  }
  public getlist=async()=>{
    const result=await this.props.getexam.getExamlist()
    const typeresult = await this.props.subject.getExamType()
    const subresult = await this.props.subject.getSubject()
      this.setState({
        examlist:result,
        top_list: subresult,
        typelist: typeresult,
      })
  }
  public componentDidMount(){
    this.getlist()
  }
    public render() {
      const { examlist ,typelist,top_list} = this.state
      // typelist, top_list
      console.log(examlist)
    {examlist.map((item:any,index:number)=>{
      data.push({
        mesg:item.title,
        class:item.grade_name,
        creatperson:item.user_name,
        starttime:item.start_time.toLocaleString(),
        endtime:item.end_time.toLocaleString(),
        domain:"删除",
        key:item.exam_exam_id
      })
    })}
      return (
        <div className="box">
         
         <h2>试卷列表</h2>
         <div className="top_list">
        
         <Select defaultValue="" style={{ width: 200 ,display:'inline'}} className="selecttype">
            {typelist.length && typelist.map((item: any) => <Option value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>)}
          </Select>
       
         <Select defaultValue="" style={{ width: 200,display:'inline' }} className="selecttype">
            {top_list.length && top_list.map((item: any, index:number) => <Option value={item.exam_name} key={index}> {item.subject_text}</Option>)}
          </Select>
          <Button>搜索</Button>
         </div>
         <div className="bot_list">
           <div className="list_btn">
            <h4>试卷列表</h4>
            <div className="dev_btn">
            <Button>全部</Button>
            <Button>进行中</Button>
            <Button>已结束</Button>
            </div>
           </div>
           <Table columns={columns} dataSource={data} />
         </div>
        </div>
      );
    }
  }
export default Textlist