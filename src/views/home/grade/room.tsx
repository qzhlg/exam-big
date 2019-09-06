import * as React from 'react';
import {inject,observer} from 'mobx-react'
interface Props{
  getroom:any
}
@inject('getroom')
@observer
class Room extends React.Component<Props> {
  constructor(props:any){
    super(props)
    this.getroommethod()
  }
  public state={
    list:[]
  }
  public getroommethod=async()=>{
    const roomdata=await this.props.getroom.getRoom()
    console.log(roomdata)
    this.setState({
      list:roomdata
    })
  }
    public render() {
      return (
        <div className="box">
         this is Room page
        </div>
      );
    }
  }
export default Room