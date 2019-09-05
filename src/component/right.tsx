import * as React from 'react';
import {Layout,Menu,Breadcrumb} from 'antd'
const {  Sider,Header,Content } = Layout;
const { SubMenu } = Menu;
interface Prorout {
    routes: any
  }
import Routerview from '../router/routerview'
class Rightaside extends React.Component<Prorout> {
    public render() {
        const { routes } = this.props
        console.log(this.props)
      return (
        <div className="right-box">
        
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Routerview routes={routes}/>
              </div>
            </Content>
         
        </div>
      );
    }
  }
export default Rightaside