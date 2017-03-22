import React, {Component} from 'react'
import Icon from 'antd/lib/icon'

class Folder extends Component{
    render(){
        return (
            <div className='folder'>
                <Icon type="folder" />
                {this.props.title}
            </div>
        )
    }
}

export default Folder
