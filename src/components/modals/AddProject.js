import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'

const FormItem = Form.Item

class AddProject extends Component{
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
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='开始时间'
                        hasFeedback>
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='结束时间'
                        hasFeedback>
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='类型'
                        hasFeedback>
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='描述'
                        hasFeedback>
                        <Input />
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export default AddProject
