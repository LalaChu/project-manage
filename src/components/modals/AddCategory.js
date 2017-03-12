import React, { Component } from 'react'
import Modal from 'antd/lib/modal'

class AddCategory extends Component{
    handleCancel = () => {
        this.props.onCancel(false)
    }
    render(){
        return (
            <Modal
                onCancel={this.handleCancel}
                visible={this.props.visible}>AddCategory</Modal>
        )
    }
}
export default AddCategory
