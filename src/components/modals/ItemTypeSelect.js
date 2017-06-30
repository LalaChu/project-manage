import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import Popover from 'antd/lib/popover'

class ItemTypeSelect extends Component{
    handleCancel = () => {
        this.props.onCancel(false)
    }
    handleProjectSelect = () => {
        this.props.onCancel(false)
        this.props.setAddProjectVisible(true, 'add')
    }
    handleCategorySelect = () => {
        this.props.onCancel(false)
        this.props.setAddCategoryVisible(true, 'add')
    }
    handleTaskSelect = () => {
        this.props.onCancel(false)
        this.props.setAddTaskVisible(true, 'add')
    }
    render(){
        const { visible } = this.props
        return (
            <Modal
                onCancel={this.handleCancel} 
                visible={visible}
                footer={null}>
                <Row className='select-row'>
                    <Col span='8'>
                        <Popover content='添加项目'>
                            <Card onClick={this.handleProjectSelect}
                                className='select-card'>
                                <Icon type="folder" className='select-icon'/>
                            </Card>
                        </Popover>
                    </Col>
                    <Col span='8'>
                        <Popover content='添加工作分类'>
                            <Card onClick={this.handleCategorySelect}
                                className='select-card'>
                                <Icon type="copy" className='select-icon'/>
                            </Card>
                        </Popover>
                    </Col>
                    <Col span='8'>
                        <Popover content='添加具体工作'>
                            <Card onClick={this.handleTaskSelect}
                                className='select-card'>
                                <Icon type="file-text" className='select-icon'/>
                            </Card>
                        </Popover>
                    </Col>
                </Row>
            </Modal>
        )
    }
}
export default ItemTypeSelect
