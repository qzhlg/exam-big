import { Button, Checkbox, Form, Icon, Input, message } from 'antd';

import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react';
import './sass/style.css'
import { inject, observer } from 'mobx-react'

interface Props {
  form: WrappedFormUtils,
  user: any,
  abc?: string,
  history: any
}
@inject('user')
@observer

class Login extends React.Component<Props, any> {
  public handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const result = await this.props.user.login(values);
        console.log('result...', result);
        // const {code,msg}=await this.props.user.login(values)
        // console.log(msg)
        if (result === 1) {

          message.success('login success!')
          this.props.history.push('/home')


        } else {
          message.error('login success!')
        }
      }
    });
  };
  public render() {
    const { getFieldDecorator } = this.props.form
    console.log(this.props.form)
    const { user_name, user_pwd } = this.props.user.account
    return (
      <div className='form-box'>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('user_name', {
              initialValue: user_name,
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"

              />,
            )}

          </Form.Item>
          <Form.Item>
            {getFieldDecorator('user_pwd', {
              initialValue: user_pwd,
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,

            )}

          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              initialValue: true,
              valuePropName: 'checked'

            })(<Checkbox>记住密码</Checkbox>)}
            {getFieldDecorator('autoLogin', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Auto login in 7 days</Checkbox>)}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
          </Button>

          </Form.Item>
        </Form>
      </div>

    );
  }
}
export default Form.create()(Login)
