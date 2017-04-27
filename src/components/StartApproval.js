import React, { Component } from 'react'
import createColumns from '../tableStructure/task'
import Table from 'antd/lib/table'

class StartApproval extends Component{
    componentWillMount(){
        this.props.fetchTask()
    }
    render(){

        let columns = createColumns()
        const {taskList} = this.props
        return (
            <div className='start-approval'>
                <Table 
                    rowKey='_id'
                    bordered={true}
                    columns={columns}
                    dataSource={taskList} />
            </div>
        )
    }
}

export default StartApproval
