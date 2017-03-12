import React, { Component } from 'react'
import Modal from 'antd/lib/modal'

class AddTask extends Component{
    handleCancel = () => {
        this.props.onCancel(false)
    }
    render(){
        return (
            <Modal
                onCancel={this.handleCancel}
                visible={this.props.visible}>AddTask</Modal>
        )
    }
}
export default AddTask
