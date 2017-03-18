import Icon from 'antd/lib/icon'
import React from 'react'

const createColumns = function(edit, remove){
  return [{
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
            render: (text, record, index) => {
              return (
                <div className='icon-manage'>
                  <a onClick={() => {edit(record)}}><Icon type="edit" /></a>
                  <span className='spin'>|</span>
                  <a onClick={remove}><Icon type="delete" /></a>
                </div>
                
              )
            }
          }];
}

export default createColumns
