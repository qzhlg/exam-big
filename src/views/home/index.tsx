import * as React from 'react';
import { Breadcrumb, Layout } from 'antd';
import 'antd/dist/antd.css';
import Routerview from '../../router/routerview'
import Head from '@/component/head'
import Leftaside from '@/component/left'
// import Rigthaside from '@/component/right'

const { Content, Header } = Layout;
interface Prorout {
  routes: any
}

class Home extends React.Component<Prorout>{
  public onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };
  public render() {
    const { routes } = this.props

    return (
      <div className='container'>
    <Head/>
        <Layout style={{ height: 'auto', display: 'scroll', clear: 'both' }}>
      <Leftaside/>
          <Layout style={{ height: '100%',marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <Breadcrumb style={{ margin: '16px 0' }}/>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Routerview routes={routes} />
              </div>
            </Content>

          </Layout>
          {/* <Rigthaside routes={routes}></Rigthaside> */}
        </Layout>
      </div>
    );
  }


}
export default Home


