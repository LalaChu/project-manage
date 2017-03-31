import React, {Component} from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'


class File extends Component{
    handleClick = (e) => {
        // console.log(e)
        // // console.log(e.target.className)
        // if(e.target.className === 'folder'){
        //     let path = this.props.file.path
        //     console.log(this.props.file.path)
        //     this.props.onClick(path)
        // }
    }
    handleOpenRemove = () => {
        this.props.onRemove(this.props.file)
    }
    handleOpenModal = () => {
        this.props.onEdit(true, 'edit', this.props.file)
    }
    render(){
        return (
            <div className='file' onClick={this.handleClick}>
                <Icon type="file" />
                {this.props.file.name}
                <div className='file-manage'>
                    <Button onClick={this.handleOpenRemove}>
                        <Icon type='download'></Icon>
                    </Button>
                    <Button onClick={this.handleOpenModal}>
                        <Icon type='edit'></Icon>
                    </Button>
                    <Button onClick={this.handleOpenRemove}>
                        <Icon type='delete'></Icon>
                    </Button>
                </div>
                
            </div>
        )
    }
}

export default File
