import Icon from 'antd/lib/icon'
import React from 'react'

const columns = [{
  title: '部门名称',
  dataIndex: 'name',
  key: 'name',
  width: 150,
}, {
  title: '负责人',
  dataIndex: 'manageId',
  key: 'manageId',
  width: 150,
}, {
  title: '人数',
  dataIndex: 'staffNum',
  key: 'staffNum',
  width: 150,
}, {
  title: '操作',
  key: 'opration',
  width: 70,
  render: () => {
    return (
      <div className='icon-manage'>
         <a><Icon type="edit" /></a>
         <a className='spin'>|</a>
         <a><Icon type="delete" /></a>
      </div>
      
    )
  }
}];

export default columns
