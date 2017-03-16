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
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        const { getFieldDecorator } = this.props.form
        const { visible, method, items } = this.props
        console.log(this.props)
        const title = getTitleByMethod(method) + '部门' 
        
        const children = items.map(function(item){
            return <Option value={item._id} key={item._id}>{item.name}</Option>
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
                        {getFieldDecorator('parentId')(<Select>{children}</Select>)}
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
                        hasFeedback>
                        {getFieldDecorator('manageId')(<Select />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const DepartmentModal = Form.create()(DepartmentForm)

export default DepartmentModal


