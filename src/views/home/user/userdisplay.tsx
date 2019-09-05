import * as React from 'react';

import { inject, observer } from 'mobx-react'

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
      return (
        <div className="box">
         this is Userdisplay page
        </div>
      );
    }
  }
export default Userdisplay