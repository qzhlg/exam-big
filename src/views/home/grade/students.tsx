import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Table, Input, Select, Button } from 'antd'
import * as XLSX from 'xlsx'
const { Option } = Select;
import './student.css'
interface Info {
  getmessage: any,
  student: any
}
@inject('getmessage', 'student')
@observer
class Student extends React.Component<Info> {
  constructor(props: any) {
    super(props)
  }
  public state = {
    list: [],
    data: [],
    columns: [
      {
        title: '姓名',
        dataIndex: 'student_name',
        key: 'student_name',
      },
      {
        title: '学号',
        dataIndex: 'student_id',
        key: 'student_id',
      },
      {
        title: '班级',
        dataIndex: 'grade_name',
        key: 'grade_name',
      },
      {
        title: '教室',
        dataIndex: 'room_text',
        key: 'room_text',
      },
      {
        title: '密码',
        dataIndex: 'student_pwd',
        key: 'student_pwd',
      },
      {
        title: '操作',
        key: 'domain',
        render: (e: any) => (
          <p>
            <span onClick={() => {
              console.log(e)
              const { student_id } = e
              this.delete(student_id)
            }}>删除</span>
          </p>
        )
      }
    ]
  }
  // 删除
  public delete = async (student_id: any) => {
    console.log(this.props.student)
    await this.props.student.deleteStudent({ student_id })
  }
  public getdata = async () => {
    const messagedata = await this.props.getmessage.getMessage()
    messagedata.map((item: any) => {
      this.setState({
        data: messagedata
      })
    })
    this.setState({
      list: messagedata
    })
  }
  public handleSelectChange = (value: string) => {
    console.log(value);
  };
  public chageInput = (e: any) => {
    this.setState({
      student_name: e.target.value
    })
  }
  // 模糊查询
  // public handClick = (e: any) => {

  //   let newArr = studentList.filter((item: any) => {
  //     let flag = true;
  //     if (student_name) {
  //       flag = flag && student_name === item.student_name;
  //     }
  //     if (grade_id) {
  //       flag = flag && grade_id === item.grade_id;
  //     }
  //     if (room_id) {
  //       flag = flag && room_id === item.rorm_id;
  //     }
  //     return flag;
  //   })
  //   this.setState({
  //     newList: newArr
  //   })
  // }
  public componentDidMount() {
    this.getdata()
  }
  public reset = () => {
    this.setState({

    })
  }
  public exportExcel = () => {
    // 把table里面的数据生成worksheet
    let wroksheet = XLSX.utils.json_to_sheet(this.state.data)
    // 把worksheet放在workbook里
    let workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, wroksheet);
    XLSX.utils.book_append_sheet(workbook, wroksheet);
    XLSX.utils.book_append_sheet(workbook, wroksheet);
    XLSX.utils.book_append_sheet(workbook, wroksheet);
    XLSX.utils.book_append_sheet(workbook, wroksheet);

    XLSX.writeFile(workbook, '学生名单.xlsx');
  }
  public uploadExcel = (e: any) => {
    let reader = new FileReader();
    reader.onload = function (es: any) {
      let dataed = new Uint8Array(es.target.result);
      let workbook = XLSX.read(dataed, { type: 'array' });
      let ws = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    }
    reader.readAsArrayBuffer(e.target.files[0]);
  }
  public render() {
    const { list, columns, data } = this.state
    return (
      <div className="box">
        <h2>学生管理</h2>
        <div className="top_btn">
          <Input placeholder=" 请输入学生姓名" className="name"  />
          <Select defaultValue="请选择教室号"
            onChange={this.handleSelectChange}
            style={{ width: 120, marginLeft: 16 }}
          >
            {list.map((item: any) => <Option value="" key={item.room_id}>{item.room_text}</Option>)}
          </Select>
          <Select
            defaultValue="请选择班级名"
            onChange={this.handleSelectChange}
            style={{ width: 120, marginLeft: 16 }}
          >
            {list.map((item: any, index: number) => <Option value="" key={index}>{item.grade_name}</Option>)}
          </Select>
          <Button className="add_btns" >搜索</Button>
          <Button className="add_btns" >重置</Button>

          <Button type="primary" onClick={this.exportExcel} style={{ marginLeft: "10px" }}>
            导出学生名单
          </Button>
          <Button type="primary" style={{ marginLeft: "10px" }}>
            <input type="file" accept=".xlsx" onChange={this.uploadExcel} />
          </Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey={(record: any) => {

          return record.card
        }} />
      </div>
    );
  }
}

export default Student