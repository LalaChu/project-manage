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
        const {location, file} = this.props
        let fileUrl = location ? location.split('/public/upload/')[1] + '/' : ''
        return (
            <div className='file' onClick={this.handleClick}>
                <Icon type="file" />
                {file.name}
                <div className='file-manage'>
                    <Button>
                        <a href={`/public/upload/${fileUrl}${file._id}.${file.type}`}><Icon type='download'></Icon></a>
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
