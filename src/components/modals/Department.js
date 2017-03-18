import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'
import { getTitleByMethod } from '../../helper'
// import DepartmentForm from '../forms/department'

const FormItem = Form.Item
const Option = Select.Option

class DepartmentForm extends Component{
    handleAdd = () => {
        this.props.form.validateFieldsAndScroll((err,values) => {
            if(!err){
                this.props.onAdd(values);
            }
        })
        
    }
    componentWillUpdate(){
        console.log('form update')
        const { visible } = this.props
        if(!visible){
            this.props.form.resetFields()
        }
        
    }
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        const { getFieldDecorator } = this.props.form
        const { visible, method, items, staffList} = this.props
        const title = getTitleByMethod(method) + '部门' 
        
        let children = items.map(function(item){
            return <Option value={item._id} key={item._id}>{item.name}</Option>
        })
        children.push(<Option value='' key={0}>不选择父级部门</Option>)

        let staffOptions = staffList.map(function(staff){
            return <Option value={staff._id} key={staff._id}>{staff.name}</Option>
        })
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={this.props.onCancel}
                onOk={this.handleAdd}>
                <Form>
                    <FormItem
                        {...formLayout}
                        label='所属部门'
                        >
                        {getFieldDecorator('parentId')(<Select allowClear={true} disabled={method === 'edit' ? true : false}>{children}</Select>)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='名称'
                        hasFeedback>
                        {getFieldDecorator('name',{
                            rules:[{required:true, message: '姓名不能为空'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='负责人'
                        >
                        {getFieldDecorator('manageId')(<Select allowClear={true}>{staffOptions}</Select>)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const DepartmentModal = Form.create({mapPropsToFields:function(props){
    console.log(props)
    if(!props.record){
        return {}
    }
    return {
        name: {value: props.record.name},
        manageId: {value: props.record.manageId || ''},
        parentId: {value: props.record.parentId || ''}
    }
}})(DepartmentForm)

export default DepartmentModal


