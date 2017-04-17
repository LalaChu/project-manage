import React, {Component} from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'


class Folder extends Component{
    handleClick = (e) => {
        console.log(e)
        // console.log(e.target.className)
        if(e.target.className === 'folder'){
            let path = this.props.file.path
            console.log(this.props.file.path)
            this.props.onClick(path)
        }
    }
    handleOpenRemove = () => {
        this.props.onRemove(this.props.file)
    }
    handleOpenModal = () => {
        this.props.onEdit(true, 'edit', this.props.file)
    }
    render(){
        let manage = []
        if(this.props.file._id === -1){
            manage.push(<Button key='1' className='folder-manage-disabled' disabled={true}>系统文件不可操作</Button>)
        }else{
            manage.push(<Button key='1' onClick={this.handleOpenModal}><Icon type='edit'></Icon></Button>)
            manage.push(<Button key='2' onClick={this.handleOpenRemove}><Icon type='delete'></Icon></Button>)
        }
        return (
            <div className='folder' onClick={this.handleClick}>
                <Icon type="folder" />
                {this.props.file.name}
                <div className='folder-manage'>
                    {manage}
                </div>
                
            </div>
        )
    }
}

export default Folder
