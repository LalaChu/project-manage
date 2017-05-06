import React, { Component } from 'react'
import createColumns from '../tableStructure/approval'
import Table from 'antd/lib/table'

class NeedApproval extends Component{
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

        const {myCheck, fetchCheckTask} = this.props
        let columns = createColumns(fetchCheckTask)
        return (
            <div className='start-approval'>
                <Table 
                    rowKey='_id'
                    bordered={true}
                    columns={columns}
                    dataSource={myCheck} />
            </div>
        )
    }
}

export default NeedApproval
