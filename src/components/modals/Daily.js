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
import Icon from 'antd/lib/Icon'
// import * as Authority from '../../constants/authority'
// import DepartmentForm from '../forms/department'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode

class DailyForm extends Component{
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
        
        // let nodes = [] 
        // departmentList.forEach(function(depart){
            // let children = []
            // depart.children.forEach(function(item){
                // children.push(<TreeNode key={item._id} value={item._id} title={item.name}/>)
            // })
            // nodes.push(<TreeNode key={depart._id} value={depart._id} title={depart.name}>{children}</TreeNode>)
        // })
        // let authorities = []
        // for(let e in Authority){
            // authorities.push(<Option value={e} key={e}>{Authority[e]}</Option>)
        // }
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={this.props.onCancel}
                onOk={this.handleAdd}
                >
                <Form>
                    <FormItem
                        {...formLayout}
                        label='相关任务'
                        >
                        {getFieldDecorator('taskId')(
                            <Select>{nodes}</Select>)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='标题'
                        hasFeedback>
                        {getFieldDecorator('title',{
                            rules:[{required:true, message: '姓名不能为空'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='类型'
                        hasFeedback>
                        <Select />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='内容'
                        hasFeedback>
                        {getFieldDecorator('content',{
                            rules:[{required:true, message: '邮件不能为空'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='相关文件'
                        hasFeedback>
                        {getFieldDecorator('file')(
                            <Upload>
                                <Button>
                                <Icon type="upload" />上传文件
                                </Button>
                            </Upload>)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const DailyModal = Form.create({mapPropsToFields:function(props){
    console.log(props)
    if(!props.record){
        return {}
    }
    let departmentId = props.record.departmentId
    return {
        name: {value: props.record.name},
        email: {value: props.record.email},
        telephone: {value: props.record.telephone},
        authority: {value: props.record.authority},
        departmentId: {value: departmentId ? departmentId[1] : departmentId[0] || ''}
    }
}})(DailyForm)

export default DailyModal
