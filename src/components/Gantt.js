import React, {Component } from 'react'
import Table from 'antd/lib/table'
import createColumns from '../tableStructure/gantt'

class Gantt extends Component{
    render () {
        const {list} = this.props
        const table = createColumns(list)
        console.log(list)

        return (
            <div className="gantt">
               <Table
                    rowKey='_id'
                    scroll={{ x: `${table.width}px`}} 
                    columns={table.columns}
                    bordered={true}
                    dataSource={list}
                    />
            </div>
        );
    }
}

export default Gantt
