import React, {Component} from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'

class Folder extends Component{
    handleClick = (e) => {
        // console.log(e.target.className)
        if(e.target.className === 'folder'){
            let path = this.props.file.path
            console.log(this.props.file.path)
            this.props.onClick(path)
        }
    }
    render(){
        return (
            <div className='folder' onClick={this.handleClick}>
                <Icon type="folder" />
                {this.props.file.name}
                <div className='folder-manage'>
                    <Button>
                        <Icon type='edit'></Icon>
                    </Button>
                    <Button>
                        <Icon type='delete'></Icon>
                    </Button>
                </div>
                
            </div>
        )
    }
}

export default Folder
