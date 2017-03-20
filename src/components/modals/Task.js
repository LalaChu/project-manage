import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'
import TreeSelect from 'antd/lib/tree-select'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode

class Task extends Component{
    handleCancel = () => {
        this.props.onCancel(false)
    }
    render(){
        const formLayout = {
            labelCol: {span : 6},
            wrapperCol: {span: 14}
        }
        const { staffList, projectList } = this.props
        let staffOption = staffList.map(function(staff){
            return <Option key={staff._id} value={staff._id}>{staff.name}</Option>
        })
        let projectOption = []
        projectList.map(function(pro){
            if(pro.type === 'project'){
                var protemp = pro;
                let children = [];
                if(pro.children.length){
                    pro.children.map(function(child){
                        if(child.type === 'category'){
                            children.push(<TreeNode key={child._id} value={child._id} title={child.name}></TreeNode>)
                        }
                    })
                }
                projectOption.push(<TreeNode key={pro._id} value={pro._id} title={pro.name}>{children}</TreeNode>)
            }
        })
        return (
            <Modal
                onCancel={this.handleCancel}
                visible={this.props.visible}
                title='添加具体工作'>
                <Form>
                    <FormItem 
                        {...formLayout}
                        label='名称'
                        hasFeedback>
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='父节点'
                        hasFeedback>
                        <TreeSelect>{projectOption}</TreeSelect>
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='负责人'
                        hasFeedback>
                        <Select>{staffOption}</Select>
                    </FormItem>
                    <FormItem label='起止时间'
                        labelCol={{span: 6}}>
                        <Col span='6'>
                            <FormItem 
                                hasFeedback>
                                <DatePicker />
                            </FormItem>
                        </Col>
                        <Col span='2'><p className="ant-form-split">-</p></Col>
                        <Col span='6'>
                            <FormItem 
                                hasFeedback>
                                <DatePicker />
                            </FormItem>
                        </Col>
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label='类型'
                        hasFeedback>
                        <Select />
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
export default Task
