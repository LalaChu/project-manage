import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Col from 'antd/lib/col'

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
                    console.log(values)
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
        return (
            <Modal
                onCancel={this.handleCancel}
                visible={this.props.visible}
                onOk={this.handleAdd}
                title='添加项目'>
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

const ProjectModal = Form.create({mapPropsToFields:function(props){
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
}})(ProjectForm)

export default ProjectModal
