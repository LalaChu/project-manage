import React, { Component } from 'react'
import Form from 'antd/lib/form'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import Card from 'antd/lib/card'
import Notification from 'antd/lib/notification' 
import * as Status from '../constants/status'

const FormItem = Form.Item

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            telephone: '',
            departmentId: '',
        }
    }
    componentDidUpdate(){
        if(this.props.StaffState.username){
            return
        }
        this.showNotification(this.props.StaffState.status)
    }
    handleNameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleTelephoneChange = (e) => {
        this.setState({
            telephone: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('tets');
        this.props.onRegister(this.state);
    }
    showNotification(status){
        let description = ''
        let icon = ''
        if(status === Status.SUCCESS){
            description = '恭喜您，注册成功，正在登录中，请稍后'
            icon = <Icon type="smile-circle" style={{ color: '#108ee9' }} />
        }else if(status === Status.ERROR){
            description = '对不起，注册失败，请重试'
            icon = <Icon type="frown-o" style={{ color: '#108ee9' }}/>
        }else{
            return
        }
        Notification.open({
            message: '注册通知',
            description: description,
            icon: icon,
        });
    }
    render(){
        const formItemLayout = {
            labelCol: {span : 7},
            wrapperCol: {span: 13}
        }
        const tailFormItemLayout = {
            wrapperCol: {
                span: 13,
                offset: 7,
            },
        };
        // console.log(this.props)
        // this.showNotification(this.props.StaffState.status)
        return (
            <div className='register'>
                <Card className='register-section' title='注册'>
                    <Form onSubmit={this.handleSubmit} className='register-form'>
                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                            hasFeedback>
                            <Input onChange={this.handleNameChange}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback>
                            <Input type="password" onChange={this.handlePasswordChange}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            hasFeedback>
                            <Input type="password" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                            hasFeedback>
                            <Input onChange={this.handleEmailChange}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="手机号">
                            <Input onChange={this.handleTelephoneChange}/>
                        </FormItem>
                        {/*<FormItem
                        {...formItemLayout}
                        label="Captcha"
                        extra="We must make sure that your are a human."
                        >
                        <Row gutter={8}>
                            <Col span={12}>
                                <Input size="large" />
                            </Col>
                            <Col span={12}>
                            <Button size="large">Get captcha</Button>
                            </Col>
                        </Row>
                        </FormItem>*/}
                        {/*<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                            <Checkbox>I have read the <a>agreement</a></Checkbox>
                        </FormItem>*/}
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Register
