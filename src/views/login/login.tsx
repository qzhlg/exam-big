import {Button, Checkbox,Form, Icon, Input  } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import * as React from 'react';
// import '.ss/style.css'
interface UserFormProps extends FormComponentProps {
  age: number;
  name: string;
}

class Login extends React.Component<UserFormProps, any> {
  public handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
    public render() {
      console.log(this.props)
      const { getFieldDecorator } = this.props.form
      
      return (
        <div className='form-box'>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            
            />,
          )}
          
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
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
            
          })( <Checkbox>记住密码</Checkbox>)}
         
          <a className="login-form-forgot" href="">
           忘记密码
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
        
        </Form.Item>
      </Form>
        </div>
       
      );
    }
  }
export default Form.create({ name: 'normal_login' })(Login)