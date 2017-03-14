import React, { Component } from 'react'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'

const FormItem = Form.Item

class Login extends Component{
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        return (
            <div className='login'>
                <Card title='登陆' className='login-section'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        </FormItem>
                        <FormItem>
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        </FormItem>
                        <Checkbox>Remember me</Checkbox>
                        <a className="login-form-forgot">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href='/register'>register now!</a>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Login
