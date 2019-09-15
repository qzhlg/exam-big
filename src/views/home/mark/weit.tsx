import * as React from 'react';
import { inject, observer } from 'mobx-react'
import './weit.css'
import { Table,Card,Select,Tabs} from 'antd';
const TabPane=Tabs.TabPane
const { Option } = Select;

function callback(key:any){
  console.log(key)
}
interface Props {
  student:any,
  result: any,
  history:any,
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
    visible: false,
    data:[],
    columns :[
      { title: '班级名', dataIndex: 'grade_name', key: 'grade_name' },
      { title: '课程名称', dataIndex: 'subject_text', key: 'subject_text' },
      { title: '阅卷状态', dataIndex: 'address', key: 'address' },
      { title: '课程名称', dataIndex: 'subject_text', key: 'subject_texts' },
      { title: '成材率', dataIndex: 'room_text', key: 'room_text' },
      {
        title: '操作',
        key: 'x',
        render: (item:any)=>(
          <p>
            <a onClick={()=>{
              const {grade_id}=item
              console.log(item)
              this.props.history.push({
                pathname: `/home/classmate/id=${grade_id}`,
                state: { grade_id, item }
              })
              
            }}>批卷</a>
          </p>
        )
      }
    ]
  }
  public componentDidMount() {
    this.getList()
  }
  public getList = async () => {
    const result = await this.props.student.getStudent()
    result.map((item:any,index:number)=>{
      item.id=index
      this.setState({
        data:result
      })
    })
    this.setState({
      list: result
    })
  }
    public render() {
      const {list,columns,data}=this.state 

      return (
        <div className="box">
            <h2 className="weit_Shang">待批班级</h2>
              <Table columns={columns} dataSource={data} rowKey={(record: any) => {
              return record.id
          }}/>
            </div>
      );
    }
  }
export default Weit