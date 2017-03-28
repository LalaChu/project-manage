import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import TreeSelect from 'antd/lib/tree-select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'
import moment from 'moment'
import { getTitleByMethod } from '../../helper'

const FormItem = Form.Item
const TreeNode = TreeSelect.TreeNode

class FolderForm extends Component{
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
        const { getFieldDecorator } = this.props.form
        const { method, tree } = this.props
        let treeNodes = tree.map(function(item){
            return <TreeNode value={item._id} key={item._id} title={item.name}></TreeNode>
        })
        return (
            <Modal
                onCancel={this.props.cancel}
                visible={this.props.visible}
                onOk={this.handleAdd}
                title={getTitleByMethod(method) + '文件夹'}>
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
                        label='父文件夹'
                        hasFeedback>
                        {getFieldDecorator('parentId')(<TreeSelect treeData={tree} disabled={ method === 'edit' ? true : false } />)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='描述'
                        hasFeedback>
                        {getFieldDecorator('description')(<Input type='textarea'/>)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const FolderModal = Form.create({mapPropsToFields:function(props){
    console.log(props)
    if(!props.record){
        return {}
    }
    return {
        name: {value: props.record.name},
        parentId: {value: props.record.parentId},
        description: {value: props.record.description}
    }
}})(FolderForm)

export default FolderModal
