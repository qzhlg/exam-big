import * as React from 'react';
import './detail.css'
import { inject, observer } from 'mobx-react'
interface Props {
    getdetail: any,
    match: any
}
@inject('getdetail')
@observer
class Detail extends React.Component<Props>{
    constructor(props: any) {
        super(props)
        this.getdetailed()
    }
    public state = {
        list: [],
    }
    public getdetailed = async () => {
        const { getDetail } = this.props.getdetail
        const id = this.props.match.params.id
        getDetail()
        const data = await this.props.getdetail.getDetail(id)
        console.log(data)
    }
    public render() {
        console.log(this.props)
        return (
            <div className="detail_box">
                this is Detail page
         <h2>试题详情</h2>
                <div className="detail_content">
                    <div className="detail_left">1</div>
                    <div className="detail_right">2</div>
                </div>

            </div>
        );
    }
}
export default Detail