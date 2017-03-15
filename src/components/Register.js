import React, { Component } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import Card from 'antd/lib/card'

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
