import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import TreeSelect from 'antd/lib/tree-select'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'
import { getTitleByMethod, getParentId } from '../../helper'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
// import * as Authority from '../../constants/authority'
// import DepartmentForm from '../forms/department'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode

class DailyForm extends Component{
    constructor(){
        super()
        this.state = {
            fileList: [],
            buttonDisabled: false,
            id: ''
        }
    }
    componentDidUpdate(prevProps,prevState){
        console.log(prevProps)
        if( prevProps.record != undefined && this.props.record && prevProps.record.documentId !== this.props.record.documentId){
            console.log(prevProps)
            this.setState({fileList: [
                {
                    uid: 1,
                    name: '日报文件.doc',
                    status: 'done',
                    url: `/public/upload/daily/${this.props.record.documentId}.doc`,
                }
                ],
                id: prevState.id
            })
        }
    }
    handleAdd = () => {
        const { method, form, onAdd, onEdit, record } = this.props
        form.validateFieldsAndScroll((err,values) => {
            if(!err){
                if(method === 'add'){
                    onAdd({
                        ...values,
                        documentId: this.state.id
                    });
                }else if(method === 'view'){
                    this.props.onCancel()
                }else{
                    onEdit({
                        ...record,
                        ...values,
                        documentId: this.state.id === '' ? this.props.record.documentId : this.state.id
                    })
                }
                
            }
        })
    }
    handleUploadSuccess = (e) => {
        if(e.file.response){
            this.setState({
                id: e.file.response.result.id,
                buttonDisabled: false
            })
        }
        this.setState({fileList: e.fileList})
    }
    handleBeforeUpload = () => {
        this.setState({
            buttonDisabled: true
        })
    }
    handleRemoveFile = () => {
        const {record, removeFile} = this.props
        removeFile(record)
    }
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        const { getFieldDecorator } = this.props.form
        const { visible, method, taskList } = this.props
        
        const title = getTitleByMethod(method) + '日报'
        let nodes = []
        if(taskList){
            nodes = taskList.map(function(task){
                return <Option key={task._id} value={task._id}>{task.name}</Option>
            })
        }
        let handleUploadSuccess = this.handleUploadSuccess
        let handleBeforeUpload = this.handleBeforeUpload
        let disabled = method === 'view' ? true : false
        let upload
        if(method === 'view' && this.props.record){
            let fileId = this.props.record.documentId
            if(fileId === undefined || fileId === ''){
                upload = ''
            }else{
                upload = <FormItem 
                        {...formLayout}
                        label='相关文件'>
                        <Button>
                            <a href={`/public/upload/daily/${fileId}.doc`}><Icon type='download' />下载文件</a>
                        </Button>
                    </FormItem>
            }

        }else{
            upload = <FormItem 
                        {...formLayout}
                        label='相关文件'
                        hasFeedback={!disabled}>
                        {getFieldDecorator('file')(
                            <Upload
                                onRemove={this.handleRemoveFile}
                                fileList ={this.state.fileList}
                                defaultFileList={this.state.fileList}
                                beforeUpload={handleBeforeUpload}
                                onChange={handleUploadSuccess}
                                action={'/file'}
                                >
                                <Button disabled={this.state.fileList.length > 0 ? true : false}>
                                <Icon type="upload" />上传文件
                                </Button>
                            </Upload>)}
                    </FormItem>
        }
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={this.props.onCancel}
                onOk={this.handleAdd}
                confirmLoading={this.state.buttonDisabled}
                >
                <Form>
                    <FormItem
                        {...formLayout}
                        label='相关任务'
                        >
                        {getFieldDecorator('taskId')(
                            <Select disabled={disabled}>{nodes}</Select>)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='标题'
                        hasFeedback={!disabled}>
                        {getFieldDecorator('title',{
                            rules:[{required:true, message: '标题不能为空'}]
                        })(<Input disabled={disabled}/>)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='内容'
                        hasFeedback={!disabled}>
                        {getFieldDecorator('content')(<Input disabled={disabled} type='textarea'/>)}
                    </FormItem>
                    {upload}
                </Form>
            </Modal>
        )
    }
}

const DailyModal = Form.create({mapPropsToFields:function(props){
    // console.log(props)
    if(!props.record){
        return {}
    }
    let taskId = props.record.taskId
    return {
        title: {value: props.record.title},
        type: {value: props.record.type},
        content: {value: props.record.content},
        // authority: {value: props.record.authority},
        taskId: {value: taskId ? taskId : ''}
    }
}})(DailyForm)

export default DailyModal
