import React, {Component } from 'react'
import Table from 'antd/lib/table'
import createColumns from '../tableStructure/gantt'

class Gantt extends Component{
    render () {
        const {list} = this.props
        const columns = createColumns(list)
        return (
            <div className="gantt">
               <Table 
                    columns={columns}
                    bordered={true}/>
            </div>
        );
    }
}

export default Gantt
