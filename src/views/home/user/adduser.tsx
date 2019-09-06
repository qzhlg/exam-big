import * as React from 'react';
import './adduser.css'
import { Button, Input, Select } from 'antd'
const { Option } = Select

class Adduser extends React.Component {
  public render() {
    return (
      <div className="box">
        <h2>添加用户</h2>
        <div className="content">
          <div className="item_user">

            <div className="input">
              <Button className="btn">添加用户</Button>
              <Button>更新用户</Button>
            </div>
            <Input placeholder="请输入用户名" className="input" />
            <Input placeholder="请输入密码" className="input" />
            <Input placeholder="请输入用户ID" className="input" />
            <Select defaultValue="管理员" style={{ width: 126 }} className="input">
              <Option value="管理员">管理员</Option>
              <Option value="出题者">出题者</Option>
              <Option value="浏览者">浏览者</Option>
            </Select>
            <div className="input">
              <Button className="sure">确定</Button>
              <Button className="cancel">重置</Button>
            </div>
          </div>
          <div className="item_id">
            <div className="input">
              <Button className="btn">添加身份</Button>
            </div>

            <Input placeholder="请输入身份名称" className="input" />
            <div className="input">
              <Button className="sure">确定</Button>
              <Button className="cancel">重置</Button>
            </div>
          </div>
          <div className="item_api">
            <div className="input">
              <Button className="btn">添加api接口权限</Button>
            </div>

            <Input placeholder="请输入API接口权限名称" className="input" />
            <Input placeholder="请输入API接口权限url" className="input" />
            <Input placeholder="请输入API接口权限方法" className="input" />
            <div className="input">
              <Button className="sure">确定</Button>
              <Button className="cancel">重置</Button>
            </div>
          </div>
          <div className="item_add">
            <div className="input">
              <Button className="btn">添加视图接口权限</Button>
            </div>

            <div className="input">
              <Button className="sure">确定</Button>
              <Button className="cancel">重置</Button>
            </div>
          </div>
          <div className="item_set">
            <div className="input">
              <Button className="btn">给身份设置api接口权限</Button>
            </div>

            <div className="input">
              <Select placeholder="请选择身份id" style={{ width: 126 }}>
                <Option value="管理员">管理员</Option>
                <Option value="出题者">出题者</Option>
                <Option value="浏览者">浏览者</Option>
              </Select>
            </div>
            <div className="input">
              <Button className="sure">确定</Button>
              <Button className="cancel">重置</Button>
            </div>
          </div>
          <div className="item_setview">
            <div className="input">
              <Button className="btn">给身份设置视图权限</Button>
            </div>

            <div className="input">
              <Select placeholder="请选择身份id" style={{ width: 126 }}>
                <Option value="管理员">管理员</Option>
                <Option value="出题者">出题者</Option>
                <Option value="浏览者">浏览者</Option>
              </Select>
            </div>
            <div className="input">
              <Button className="sure">确定</Button>
              <Button className="cancel">重置</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Adduser