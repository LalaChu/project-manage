import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import columns from '../tableStructure/staff'

class Stuff extends Component{
    render(){
        return (
            <div className='staff'>
                <Button className='add-department'><Icon type="plus" />添加员工</Button>
                <Table 
                    size='middle'
                    bordered
                    columns={columns}
                    rowKey='_id'
                    scroll={{ y: 550 }}/>
            </div>
        )
    }
}

export default Stuff
