import React, {Component} from 'react'
import Icon from 'antd/lib/icon'

class Folder extends Component{
    render(){
        return (
            <div className='folder'>
                <Icon type="folder" />
                {this.props.file.name}
            </div>
        )
    }
}

export default Folder
