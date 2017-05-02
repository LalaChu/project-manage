import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'
import moment from 'moment'
import { getTitleByMethod } from '../../helper'

const FormItem = Form.Item
const Option = Select.Option

class ProjectForm extends Component{
    handleCancel = () => {
        this.props.onCancel(false)
    }
    handleAdd = () => {
        const {method, record} = this.props
        this.props.form.validateFieldsAndScroll((err,values) => {
            if(!err){
                if(method === 'add'){
                    this.props.onAdd(values)
                }else{
                    this.props.onEdit({
                        ...record,
                        ...values
                    })
                }
                
            }
        })
    }
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        const { staffList } = this.props
        let staffOption = staffList.map(function(staff){
            return <Option key={staff._id} value={staff._id}>{staff.name}</Option>
        })
        const { getFieldDecorator } = this.props.form
        const { method } = this.props
        return (
            <Modal
                onCancel={this.handleCancel}
                visible={this.props.visible}
                onOk={this.handleAdd}
                title={getTitleByMethod(method) + '项目'}>
                <Form>
                    <FormItem 
                        {...formLayout}
                        label='名称'
                        hasFeedback>
                        {getFieldDecorator('name',{
                            rules:[{required:true, message: '名称不能为空'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='负责人'
                        hasFeedback>
                        {getFieldDecorator('manageId',{
                            rules:[{required:true, message: '请选择负责人'}]
                        })(<Select>{staffOption}</Select>)}
                    </FormItem>
                    <FormItem label='起止时间'
                        labelCol={{span: 6}}>
                        <Col span='6'>
                            <FormItem 
                                hasFeedback>
                                {getFieldDecorator('startTime',{
                                    rules:[{required:true, message: '开始时间'}]
                                })(<DatePicker />)}
                            </FormItem>
                        </Col>
                        <Col span='2'><p className="ant-form-split">-</p></Col>
                        <Col span='6'>
                            <FormItem 
                                hasFeedback>
                                {getFieldDecorator('endTime')(<DatePicker />)}
                            </FormItem>
                        </Col>
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

const ProjectModal = Form.create({mapPropsToFields:function(props){
    if(!props.record){
        return {}
    }
    return {
        name: {value: props.record.name},
        state: {value: props.record.state},
        type: {value: props.record.telephone},
        manageId: {value: props.record.manageId},
        startTime: {value: props.record.startTime ? moment(props.record.startTime, 'YYYY-MM-DD') : ''},
        endTime: {value: props.record.endTime ? moment(props.record.endTime, 'YYYY-MM-DD') : ''},
        description: {value: props.record.description}
    }
}})(ProjectForm)

export default ProjectModal
