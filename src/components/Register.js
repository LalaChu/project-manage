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

class RegisterForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            confirmDirty: false,
        }
    }
    componentDidUpdate(){
        if(this.props.StaffState.username){
            return
        }
        this.showNotification(this.props.StaffState.status)
    }
    handleConfirmBlur = (e) => {
        this.setState({ confirmDirty: this.state.confirmDirty || !!e.target.value });
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    }
    checkTelephone = (rule, value, callback) => {
        const pattern = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/
        const form = this.props.form;
        if (value && !pattern.exec(value)) {
            callback('请输入正确的手机号码');
        } else {
            callback();
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onRegister(values)
                console.log('Received values of form: ', values);
            }
            console.log('err')
        });
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
        const { getFieldDecorator } = this.props.form
        console.log(this.props)
        return (
            <div className='register'>
                <Card className='register-section' title='注册'>
                    <Form onSubmit={this.handleSubmit} className='register-form'>
                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                            hasFeedback
                            required>
                            {getFieldDecorator('name',{
                                rules:[{required:true, message: '姓名不能为空'}]
                            })(<Input />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback
                            required>
                            {getFieldDecorator('password',{
                                rules:[{ required: true, message: '密码不能为空'},{validator: this.checkConfirm}]
                            })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            hasFeedback
                            required>
                            {getFieldDecorator('confirm',{
                                rules:[{required: true, message: '两次密码不一致'},{validator: this.checkPassword}]
                            })(<Input type="password" />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                            hasFeedback
                            required>
                            {getFieldDecorator('email',{
                                rules:[{type: 'email', message: '邮箱格式不正确'},{required: true, message: '请输入邮箱'}]
                            })(<Input />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="手机号"
                            hasFeedback
                            required>
                            {getFieldDecorator('telephone',{
                                rules:[{required: true, message: '请输入正确的手机号'},{validator: this.checkTelephone}]
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

const Register = Form.create()(RegisterForm)



export default Register
