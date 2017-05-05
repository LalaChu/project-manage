import React, { Component } from 'react'
import createColumns from '../tableStructure/task'
import Table from 'antd/lib/table'

class StartApproval extends Component{
    componentWillMount(){
        this.props.fetchTask()
    }
    componentDidUpdate(){
        const { needFetch, fetchTask } = this.props
        if(needFetch){
            fetchTask()
        }
    }
    render(){

        
        const {myTask, startCheck} = this.props
        let columns = createColumns(startCheck)
        return (
            <div className='start-approval'>
                <Table 
                    rowKey='_id'
                    bordered={true}
                    columns={columns}
                    dataSource={myTask} />
            </div>
        )
    }
}

export default StartApproval
