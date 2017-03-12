import React, { Component } from 'react'
import Modal from 'antd/lib/modal'

class ItemTypeSelect extends Component{
    handleCancel = () => {
        this.props.onCancel(false)
    }
    render(){
        const { visible, onCancle } = this.props
        return (
            <Modal
                onCancel={this.handleCancel} 
                visible={visible}>add item select</Modal>
        )
    }
}
export default ItemTypeSelect
