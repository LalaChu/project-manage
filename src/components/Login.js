import React, { Component } from 'react'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'
const FormItem = Form.Item

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onLogin(this.state.username, this.state.password)
    }

    handlePasswordChange = (e) => {
        this.setState({password:e.target.value})
    }

    handleUsernameChange = (e) => {
        this.setState({username:e.target.value})
    }

    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        console.log(this.props)
        return (
            <div className='login'>
                <Card title='登陆' className='login-section'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的账号" onChange={this.handleUsernameChange}/>
                        </FormItem>
                        <FormItem>
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入您的密码" onChange={this.handlePasswordChange}/>
                        </FormItem>
                        <Checkbox>记住密码</Checkbox>
                        <a className="login-form-forgot">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        没有账号 <a href='/register'>注册</a>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Login
