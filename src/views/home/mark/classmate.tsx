
import * as React from 'react';
import {inject,observer} from 'mobx-react'
import {Table,Select} from 'antd'
const { Option } = Select;

interface Props{
    result: any,
}
@inject('student')
@observer


class Classmate extends React.Component {
    constructor(props:any){
        super(props)
        // this.getList()
      }
      public state={
          list:[],
          visible: false,
      }


    public render() {
      return (
        <div className="box">
         this is Classmate page
        </div>
      );
    }
  }
export default Classmate