import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import TreeSelect from 'antd/lib/tree-select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'
import moment from 'moment'
import { getTitleByMethod } from '../../helper'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

const FormItem = Form.Item
const TreeNode = TreeSelect.TreeNode

class FileForm extends Component{
    handleAdd = () => {
        const {method, record} = this.props 
        this.props.form.validateFieldsAndScroll((err,values) => {
            console.log(values)
            // return;
            if(!err){
                if(method === 'add'){
                    values._id = this.state.id
                    this.props.onEdit(values)
                }else{
                    this.props.onEdit({
                        ...record,
                        ...values,
                        
                    })
                }
                
            }
        })
    }
    handleUploadSuccess = (e) => {
        // console.log(e.file.response)
        if(e.file.response){
            this.setState({
                id: e.file.response.result.id
            })
        }
    }
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        const { getFieldDecorator } = this.props.form
        const { method, tree } = this.props
        let handleUploadSuccess = this.handleUploadSuccess;
        let file ;
            if(method === 'edit'){
                file = [];
            }else{
                file =  <FormItem 
                        {...formLayout}
                        label='文件'
                        hasFeedback>
                        {getFieldDecorator('file',{
                            rules: [{required: true, message: '请上传文件'}]
                        })(
                            <Upload
                                onChange={handleUploadSuccess}
                                action={'/file'}>
                                <Button>
                                    <Icon type="upload" /> 上传文件
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
            }
        
        return (
            <Modal
                onCancel={this.props.cancel}
                visible={this.props.visible}
                onOk={this.handleAdd}
                title={getTitleByMethod(method) + '文件'}>
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
                        {getFieldDecorator('pathId')(<TreeSelect treeData={tree}/>)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='描述'
                        hasFeedback>
                        {getFieldDecorator('description')(<Input type='textarea'/>)}
                    </FormItem>
                    {file}
                </Form>
            </Modal>
        )
    }
}

const FileModal = Form.create({mapPropsToFields:function(props){
    if(!props.record){
        return {}
    }
    return {
        name: {value: props.record.name},
        parentId: {value: props.record.parentId},
        description: {value: props.record.description}
    }
}})(FileForm)

export default FileModal
