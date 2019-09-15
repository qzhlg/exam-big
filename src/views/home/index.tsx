import * as React from 'react';
import { Breadcrumb, Layout } from 'antd';
import 'antd/dist/antd.css';
import Routerview from '../../router/routerview'
import Head from '@/component/head'
import Leftaside from '@/component/left'
// import Rigthaside from '@/component/right'
import { inject, observer } from 'mobx-react'
import '@/common/style.css'
const { Content, Header } = Layout;
interface Prorout {
  routes: any,
  showview: any,
  user: any
}
@inject('showview', 'user')
@observer
class Home extends React.Component<Prorout>{
  public componentDidMount() {
    // this.getshowTitle()
  }
  public state = {
    title: [],
    message: {}
  }
  public getshowTitle = async () => {
    const userinfo = await this.props.user.usermsg()
    const showTitle = await this.props.showview.getViews()
    this.setState({
      title: showTitle.data,
      message: userinfo.data.user_id
    })
  }
  public onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };
  public render() {
    const { routes } = this.props
    const { title, message } = this.state
    return (
      <Layout>
        <Head/>
        <Layout style={{ height: '100%', marginLeft: 200,marginTop:60 }}>
          <Leftaside />
          <Content style={{ margin: '24px 16px 0'}}>
              <Routerview routes={routes} />
          </Content>
        </Layout>
      </Layout>

    );
  }


}
export default Home


