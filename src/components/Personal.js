import React, { Component } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import message from 'antd/lib/message'


const FormItem = Form.Item

class PersonalForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            confirmDirty: false,
            filename : this.props.user.avatar
        }
        console.log(this.props)
    }
    // componentWillUpdate(){
    //     if(this.props.needFetch){
    //         this.props.
    //     }
    // }
//     handleChange = (info) => {
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
//     }
//   }
    handleUploadSuccess = (e) => {
        // console.log(e.file.response)
        if(e.file.response){
            this.setState({
                filename: e.file.response.result
            })
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    }
    checkTelephone = (rule, value, callback) => {
        const pattern = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/
        const form = this.props.form;
        if (value && !pattern.exec(value)) {
            callback('请输入正确的手机号码');
        } else {
            callback();
        }
    }
    // componentWillUpdate = () => {
    //     // if(this.props.needFetch){
    //     //     this.props.get
    //     // }
    // }
    handleSubmit = (e) => {
         e.preventDefault();
         const {user} = this.props
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.avatar = this.state.filename
                values._id = user._id
                this.props.fetchUpdateStaff(values)
                this.setState({filename: ''})
            }
            console.log('err')
        })
    }
    render(){
        const formItemLayout = {
            labelCol: {span : 5},
            wrapperCol: {span: 10}
        }
        const tailFormItemLayout = {
            wrapperCol: {
                span: 10,
                offset: 7,
            },
        };
        const {getFieldDecorator} = this.props.form
        const handleUploadSuccess= this.handleUploadSuccess
        const {user} = this.props
        const {filename} = this.state
        console.log(this.state.filename)
        return (
            <div className='personal'>
                <Form className='personal-form' onSubmit={this.handleSubmit}>
                    <FormItem
                        className='personal-avatar-label'
                        {...formItemLayout}
                        label='头像'
                    >
                        <Upload
                            className="avatar-uploader"
                            name="avatar"
                            showUploadList={false}
                            action="/avatar"
                            onChange={handleUploadSuccess}
                            accept={'image/*'}
                        >
                            {
                                user.avatar === '' ? <div>dddd</div>
                                : <img src={ this.state.filename!=='' && this.state.filename ? `/public/img/${this.state.filename}?t=${Math.random()}` : `/public/avatar/${user.avatar}?t=${Math.random()}`} alt="" className="avatar" /> 
                            }</Upload>
                    </FormItem>
                    
      
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                        hasFeedback
                        required>
                        {getFieldDecorator('name',{
                            rules:[{required:true, message: '姓名不能为空'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                        required>
                        {getFieldDecorator('password',{
                            rules:[{ required: true, message: '密码不能为空'},{validator: this.checkConfirm}]
                        })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                        required>
                        {getFieldDecorator('confirm',{
                            rules:[{required: true, message: '两次密码不一致'},{validator: this.checkPassword}]
                        })(<Input type="password" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                        hasFeedback
                        required>
                        {getFieldDecorator('email',{
                            rules:[{type: 'email', message: '邮箱格式不正确'},{required: true, message: '请输入邮箱'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号"
                        hasFeedback
                        required>
                        {getFieldDecorator('telephone',{
                            rules:[{required: true, message: '请输入正确的手机号'},{validator: this.checkTelephone}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">保存</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const Personal = Form.create({mapPropsToFields:function(props){
    return {
        name: {value: props.user.name},
        password: {value: props.user.password},
        confirm: {value: props.user.password},
        email: {value: props.user.email},
        telephone: {value: props.user.telephone},
    }
}})(PersonalForm)
export default Personal
