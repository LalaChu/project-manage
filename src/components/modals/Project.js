import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'

const FormItem = Form.Item

class ProjectModal extends Component{
    handleCancel = () => {
        this.props.onCancel(false)
    }
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        return (
            <Modal
                onCancel={this.handleCancel}
                visible={this.props.visible}
                title='添加项目'>
                <Form>
                    <FormItem 
                        {...formLayout}
                        label='名称'
                        hasFeedback>
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='负责人'
                        hasFeedback>
                        <Select />
                    </FormItem>
                    <FormItem label='起止时间'
                        labelCol={{span: 6}}>
                        <Col span='6'>
                            <FormItem 
                                hasFeedback>
                                <DatePicker />
                            </FormItem>
                        </Col>
                        <Col span='2'><p className="ant-form-split">-</p></Col>
                        <Col span='6'>
                            <FormItem 
                                hasFeedback>
                                <DatePicker />
                            </FormItem>
                        </Col>
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='类型'
                        hasFeedback>
                        <Select />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='描述'
                        hasFeedback>
                        <Input type='textarea'/>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export default ProjectModal
