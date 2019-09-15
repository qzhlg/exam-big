import * as React from 'react';
import {
    Dropdown,
    Menu,
    Icon,
    Modal,
    message,
    Form,
    Input,
    Upload
} from 'antd'

import { inject, observer } from 'mobx-react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import './header.css'
interface InfoProp {
    form: WrappedFormUtils,
    user: any
}
@inject('user')
@observer
class Head extends React.Component<InfoProp> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public state = {
        visible: false,
        loading: false
    }
    public handleOk() {
        this.props.form.validateFields(async (err: any, val: any) => {
            console.log('err...', err, val);
            if (!err) {
                val.avatar = this.props.    user.avatar;
                const { code, msg } = await this.props.user.getuser(val);
                if (code === 1) {
                    message.success('更新用户信息成功');
                    this.setState({
                        visible: false
                    })
                } else {
                    message.error(msg)
                }
            }
        })
    }

    public handleCancel() {
        this.setState({
            visible: false,
        });
    }

    public beforeUpload(): boolean {
        return true
    }

    public handleChange(info: any) {
        if (info.file.status === "done") {
            // 上传成功
            this.props.user.changeAvatar(info.file.response.data[0].path);
        } else if (info.file.status === "uploading") {
            // 做上传进度条
            console.log('percent....', info.file.percent);
        }
    }

    public render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={() => this.setState({ visible: true })}>
                    个人中心
                </Menu.Item>
                <Menu.Item>
                    我的班级
                </Menu.Item>
                <span className='divider'/>
                <Menu.Item>
                    设置
                </Menu.Item>
                <Menu.Item>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        const { getFieldDecorator } = this.props.form;
        const { userInfo, avatar } = this.props.user;
        console.log(userInfo)
        const formItemLayout = {
            labelCol: { span: 4, offset: 4 },
            wrapperCol: { span: 12 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <header className="header">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" className='logo'/>
                    <Dropdown overlay={menu}>
                        <div className="userInfo">
                            <img src={userInfo.avatar} alt="用户头像" />
                            <span>{userInfo.user_name}</span>
                        </div>
                    </Dropdown>
                    <Modal
                        title="更新用户信息"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form {...formItemLayout}>
                            <Form.Item label="用户头像">
                                {getFieldDecorator('avatar', {
                                    initialValue: userInfo.user_id
                                })(<Upload
                                    name="avatar"
                                    // headers={{"content-type": "multipart/form-data"}}
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    action="http://123.206.55.50:11000/upload"
                                    showUploadList={false}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>)}
                            </Form.Item>
                            <Form.Item label="用户ID">
                                {getFieldDecorator('user_id', {
                                    initialValue: userInfo.user_id
                                })(<Input disabled={true} />)}
                            </Form.Item>
                            <Form.Item label="用户名">
                                {getFieldDecorator('user_name', {
                                    initialValue: userInfo.user_name,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your user name!',
                                        },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="密码">
                                {getFieldDecorator('user_pwd', {
                                    rules: [
                                        {
                                            validator: (ruler: object[], value: string, callback: any) => {
                                                console.log('value...', value);
                                                if (value && /^(?![a-z]+$)(?![A-Z]+$)(?!([^(a-zA-Z\!\*\.\#)])+$)^.{8,16}$/.test(value)) {
                                                    callback();
                                                } else if (!value) {
                                                    callback();
                                                } else {
                                                    callback('Please input valid password!')
                                                }
                                            }
                                        }
                                    ],
                                })(<Input />)}
                            </Form.Item>
                        </Form>
                    </Modal>
            </header>
        )
    }
}
export default Form.create()(Head)