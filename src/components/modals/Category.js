import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option

class CategoryForm extends Component{
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
                    console.log(record, values)
                    // return;
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
        
        const { staffList, projectList, method } = this.props
        const { getFieldDecorator } = this.props.form
        let projectOption = []
        projectList.map(function(pro){
            if(pro.type === 'project'){
                projectOption.push(<Option key={pro._id} value={pro._id}>{pro.name}</Option>)
            }
        })
        let staffOption = staffList.map(function(staff){
            return <Option key={staff._id} value={staff._id}>{staff.name}</Option>
        })
        return (
            <Modal
                onCancel={this.handleCancel}
                visible={this.props.visible}
                onOk={this.handleAdd}
                title='添加工作分类'>
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
                        label='父节点'
                        hasFeedback={method === 'edit' ? false : true}>
                        {getFieldDecorator('parentId',{
                            rules:[{required:true, message: '父节点不能为空'}]
                        })(<Select disabled={method === 'add' ? false : true}>{projectOption}</Select>)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='负责人'
                        hasFeedback>
                        {getFieldDecorator('manageId',{
                            rules:[{required:true, message: '不能为空'}]
                        })(<Select>{staffOption}</Select>)}
                    </FormItem>
                    <FormItem label='起止时间'
                        labelCol={{span: 6}}>
                        <Col span='6'>
                            <FormItem 
                                hasFeedback>
                                {getFieldDecorator('startTime',{
                                    rules:[{required:true, message: '不能为空'}]
                                })(<DatePicker />)}
                            </FormItem>
                        </Col>
                        <Col span='2'><p className="ant-form-split">-</p></Col>
                        <Col span='6'>
                            <FormItem 
                                hasFeedback>
                                {getFieldDecorator('endTime',{
                                    rules:[{required:true, message: '不能为空'}]
                                })(<DatePicker />)}
                            </FormItem>
                        </Col>
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='描述'
                        hasFeedback>
                        {getFieldDecorator('description')(<Input type='textarea' />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const CategoryModal = Form.create({mapPropsToFields:function(props){
    console.log(props)
    if(!props.record){
        return {}
    }
    console.log(props.record)
    return {
        name: {value: props.record.name},
        state: {value: props.record.state},
        type: {value: props.record.telephone},
        manageId: {value: props.record.manageId},
        parentId: {value: props.record.parentId},
        startTime: {value: props.record.startTime ? moment(props.record.startTime, 'YYYY-MM-DD') : ''},
        endTime: {value: props.record.endTime ? moment(props.record.endTime, 'YYYY-MM-DD') : ''},
        description: {value: props.record.description}
    }
}})(CategoryForm)

export default CategoryModal
