import * as React from 'react';
import { inject, observer } from 'mobx-react'
import './weit.css'
import { Table, Divider, Tag,Button,Modal ,Input,Select } from 'antd';

const { Option } = Select;
const columns = [
  { title: '班级名', dataIndex: 'name', key: 'name' },
  { title: '课程名称', dataIndex: 'age', key: 'age' },
  { title: '阅卷状态', dataIndex: 'address', key: 'address' },
  { title: '课程名称', dataIndex: 'kecheng', key: 'kecheng' },
  { title: '成材率', dataIndex: 'chengcai', key: 'chengcai' },

  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => <a>批卷</a>,
  },
];

const data:any=[]

interface Props {
  student:any,
  result: any
}
@inject('student')
@observer


class Weit extends React.Component<Props> {
  constructor(props:any){
    super(props)
    this.getList()
  }

  public state = {
    list: [],
    visible: false
  }




  public componentDidMount() {
    this.getList()
  }

  public getList = async () => {
  
    const result = await this.props.student.getStudent()
    console.log(result)
    this.setState({
      list: result
    })
    
  }
    public render() {
      const {list}=this.state 
      console.log(list)
     {
      list.map((item:any)=>{
        data.push({
          key:item.grade_id,
          name:item.grade_name,
          age:item.subject_text,
          kecheng:item.subject_text,
          chengcai:item.room_text,
          domain:'批卷'
        })
      })}
      
      return (
        <div className="box">
            <h2 className="weit_Shang">待批班级</h2>
         
              <Table columns={columns}dataSource={data} 
              
              
              />
              
            </div>
        
      
      );
    }
  }
export default Weit