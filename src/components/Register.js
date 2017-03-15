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
                        hasFeedback
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                        >
                            <Input type="password" />
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                        >
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                            邮箱
                            </span>
                        )}
                        hasFeedback
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="手机号"
                        >
                            <Input />
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
