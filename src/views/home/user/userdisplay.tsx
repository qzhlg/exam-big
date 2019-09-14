import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Table } from 'antd'
import './userdisplay.css'
interface Props {
  user: any,
  result: any
}
const navTitle = [
  {
    tit: "用户数据",
    id: 0,
    url: "/user/user" // 用户数据
  }, {
    tit: "身份数据",
    id: 1,
    url: "/user/identity" // 展示身份数据
  }, {
    tit: "api接口权限",
    id: 2,
    url: "/user/api_authority" // 展示api接口权限数据
  }, {
    tit: "身份和api接口关系",
    id: 3,
    url: "/user/identity_api_authority_relation" // 展示身份和api权限关系
  }, {
    tit: "视图接口权限",
    id: 4,
    url: "/user/view_authority" // 视图权限数据
  }, {
    tit: "身份和视图权限关系",
    id: 5,
    url: "/user/identity_view_authority_relation" // 展示身份和视图权限关系
  }
]
@inject('user')
@observer
class Userdisplay extends React.Component<Props> {
  public state = {
    list: [],
    index: '',
    data: [],
    current: 0,
    title: '',  
    columns: [
      [
        {
          title: '用户名',
          dataIndex: 'user_name',
          key: 'user_name'
        },
        {
          title: '密码',
          dataIndex: 'user_pwd',
          key: 'user_pwd'
        },
        {
          title: '身份',
          dataIndex: 'identity_text',
          key: 'identity_text'
        }
      ],
      [
        {
          title: '身份名称',
          dataIndex: 'identity_text',
          key: 'identity_text'
        }
      ], [
        {
          title: 'api权限名称',
          dataIndex: 'api_authority_text',
          key: 'api_authority_text'
        },
        {
          title: 'api权限url',
          dataIndex: 'api_authority_url',
          key: 'api_authority_url'
        },
        {
          title: 'api权限方法',
          dataIndex: 'api_authority_method',
          key: 'api_authority_method'
        }
      ],
      [
        {
          title: '身份名称',
          dataIndex: 'identity_text',
          key: 'identity_text'
        },
        {
          title: 'api权限名称',
          dataIndex: 'api_authority_text',
          key: 'api_authority_text'
        },
        {
          title: 'api权限url',
          dataIndex: 'api_authority_url',
          key: 'api_authority_url'
        }, {
          title: 'api权限方法',
          dataIndex: 'api_authority_method',
          key: 'api_authority_method'
        }
      ], [
        {
          title: "视图权限名称",
          dataIndex: 'view_authority_text',
          key: 'view_authority_text'
        }, {
          title: "视图id",

          dataIndex: 'view_id',
          key: 'view_id'
        }
      ],
      [
        {
          title: "身份",
          dataIndex: 'identity_text',
          key: 'identity_text'
        }, {
          title: "视图名称",

          dataIndex: 'view_authority_text',
          key: 'view_authority_text'
        }, {
          title: "视图ID",

          dataIndex: 'view_id',
          key: 'view_id'
        }
      ]
    ]
  }

  public componentDidMount() {
    this.getList()
  }
  // tab切换
  public tabData = async (index: any, url: any) => {
    const tablelist = await this.props.user.getUserlist(url)
    tablelist.map((item:any)=>{
      this.setState({
        data:tablelist
      })
    })
   
    this.setState({
      current: index,
      title: navTitle[index].tit
    })
  }
  public getList = async () => {
    const result = await this.props.user.getuser()
    result.map((item: any) => {
      this.setState({
        data: result
      })
    })
   
    this.setState({
      list: result
    })
  }
  public render() {
    const {  columns, data, current, title } = this.state

    return (
      <div className="box"> 
        <div className="userZhan">用户展示</div>
        <div className="userBton">
          {
            navTitle.length && navTitle.map((item: any, index: number) =>
              <Button key={index} onClick={() => { this.tabData(index, item.url) }}
                className={current === index ? 'active' : ''}>{item.tit}</Button>
            )}
        </div>
        <h1 className="userYong">{title}</h1>
        <div>
          <Table columns={columns[current]} dataSource={data} size="middle" />

        </div>

      </div>
    );
  }
}
export default Userdisplay
