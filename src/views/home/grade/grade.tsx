import * as React from 'react';
import {inject,observer} from 'mobx-react'
interface Props{
  getclass:any
}
@inject('getclass')
@observer
class Gread extends React.Component<Props> {
  constructor(props:any){
    super(props)
    this.getclassmethod()
  }
  public state={
    list:[]
  }
  public getclassmethod=async()=>{
    const classdata=await this.props.getclass.getClass()
    console.log(classdata)
    this.setState({
      list:classdata
    })
  }
    public render() {
      return (
        <div className="box">
         this is Gread page
        </div>
      );
    }
  }
export default Gread