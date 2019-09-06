import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
interface Props {
  student:any,
  result: any
}
@inject('student')
@observer


class Weit extends React.Component<Props> {
  constructor(props:any){
    super(props)

  }

  public state = {
    list: []
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
      return (
        <div className="box">
          this is Weit page
        </div>
      );
    }
  }
export default Weit