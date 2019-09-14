import * as React from 'react';
import { Breadcrumb, Layout } from 'antd';
import 'antd/dist/antd.css';
import Routerview from '../../router/routerview'
import Head from '@/component/head'
import Leftaside from '@/component/left'
// import Rigthaside from '@/component/right'
import {inject,observer} from 'mobx-react'
const { Content, Header } = Layout;
interface Prorout {
  routes: any,
  showview:any,
  user:any
}
@inject('showview','user')
@observer
class Home extends React.Component<Prorout>{
  public componentDidMount(){
    // this.getshowTitle()
  }
  public state={
    title:[],
    message:{}
  }
  public getshowTitle=async()=>{
    const userinfo=await this.props.user.usermsg()
    const showTitle=await this.props.showview.getViews()
    this.setState({
      title:showTitle.data,
      message:userinfo.data.user_id
    })
   
  }
  public onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };
  public render() {
    const { routes } = this.props
    const { title,message } = this.state
    return (
      <div className='container'>
      <Head/>
        <Layout style={{ height: 'auto', display: 'scroll', clear: 'both' }}>
        
      <Leftaside/>
          <Layout style={{ height: '100%',marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }} >
              1
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <Breadcrumb style={{ margin: '16px 0' }}/>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
    
          {title.map((item:any)=>
            <Breadcrumb.Item key={item.view_authority_id}>{item.view_authority_text}</Breadcrumb.Item>
          )}
        </Breadcrumb> */}
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Routerview routes={routes} />
              </div>
            </Content>

          </Layout>
          {/* <Rigthaside routes={routes}></Rigthaside> */}
        </Layout>
      // </div>
    );
  }


}
export default Home


