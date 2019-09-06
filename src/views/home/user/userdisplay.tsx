import * as React from 'react';

import { inject, observer } from 'mobx-react'
import { Button,Table} from 'antd'
import './userdisplay.css'




const columns = [
  {
    title: '用户名',
    dataIndex: '用户名',
   
  },
  {
    title: '密码',
    dataIndex: '密码',
  },
  {
    title: '身份',
    dataIndex: '身份',
  },
];


const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: { name: string; }) => ({
    disabled: record.name === 'Disabled User', 
    name: record.name,
  }),
};

interface Props {
  user:any,
  result: any
}
@inject('user')
@observer


class Userdisplay extends React.Component<Props> {
  constructor(props:any){
    super(props)
    this.getList()
  }
  public state = {
    list: [],
    
  }
  
  public componentDidMount(){
    this.getList()
  }
  
  public getList = async () => {
    const { getuser } = this.props.user
    getuser()
    const result = await this.props.user.getuser()
    console.log(result)
    this.setState({
      list: result
    })
    
  }
    public render() {
      const {list} =this.state
      console.log(list)
      
      return (
        <div className="box">
           <div className="userZhan">用户展示</div>
            <div  className="userBton">
           {
             list.length&&list.map((item:any,index:number)=>  
           <Button key={index}>{item.identity_text}</Button>
             )}
             </div>
             <div className="userSu">用户数据</div>
             <div className="userbox">
    
             <Table rowSelection={rowSelection} columns={columns}/>
             
           {/* <div className="ant-table-content">
              <div className="ant-table-body">
                <Table>
                  <tbody className="ant-table-tbody">
                    <tr className="ant-table-row ant-table-row-level-0">
                      <td><div>wefr</div></td>
                      <td>we</td>
                      <td>erfg</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
           </div> */}
                  
             <div className="userCont"> 
                {
                   list.length&&list.map((item:any,index:number)=>
                   <div key={index} className="userTr">
                   <span>{item.user_name}</span>
                   <span>{item.user_pwd}</span>
                   <span>{item.identity_text}</span>
                 </div>
                   )
                 }
                </div>
               
              </div>    

               
              
             
         </div>
      );
    }
  }
export default Userdisplay
