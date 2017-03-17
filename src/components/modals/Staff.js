import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import TreeSelect from 'antd/lib/tree-select'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'
import { getTitleByMethod, getParentId } from '../../helper'
// import DepartmentForm from '../forms/department'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode

class StaffForm extends Component{
    handleAdd = () => {
        this.props.form.validateFieldsAndScroll((err,values) => {
            if(!err){
                let parentId = getParentId(this.props.departmentList, values.departmentId)
                if(parentId){
                    values.departmentId = [ parentId, values.departmentId]
                }else{
                    values.departmentId = [ values.departmentId ]
                }
                this.props.onAdd(values)
            }
        })
        
    }
    componentWillUpdate(){
        console.log('form update')
        const { visible } = this.props
        if(!visible){
            // console.log(this.props.form)
            this.props.form.resetFields()
        }
    }
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        const { getFieldDecorator } = this.props.form
        const { visible, method, departmentList } = this.props
        // console.log(this.props)
        const title = getTitleByMethod(method) + '员工'
        let nodes = [] 
        departmentList.forEach(function(depart){
            let children = []
            depart.children.forEach(function(item){
                children.push(<TreeNode key={item._id} value={item._id} title={item.name}/>)
            })
            nodes.push(<TreeNode key={depart._id} value={depart._id} title={depart.name}>{children}</TreeNode>)
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
                        {getFieldDecorator('departmentId')(
                            <TreeSelect showCheckedStrategy={TreeSelect.SHOW_ALL} onSelect={this.handleTreeSelect}>{nodes}</TreeSelect>)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='姓名'
                        hasFeedback>
                        {getFieldDecorator('name',{
                            rules:[{required:true, message: '姓名不能为空'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='联系方式'
                        hasFeedback>
                        {getFieldDecorator('telephone',{
                            rules:[{required:true, message: ''}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='邮件'
                        hasFeedback>
                        {getFieldDecorator('email',{
                            rules:[{required:true, message: ''}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='权限'
                        hasFeedback>
                        {getFieldDecorator('authority',{
                            rules:[{required:true, message: ''}]
                        })(<Input />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const StaffModal = Form.create()(StaffForm)

export default StaffModal
