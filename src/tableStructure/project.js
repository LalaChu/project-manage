import React from 'react'
import Icon from 'antd/lib/icon'

const createColumns = function(edit, remove){
    return [{
              title: '名称',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: '类型',
              dataIndex: 'type',
              key: 'type',
            }, {
              title: '状态',
              dataIndex: 'state',
              key: 'state',
            }, {
              title: '负责人',
              dataIndex: 'manageName',
              key: 'manageName',
            }, {
              title: '开始时间',
              dataIndex: 'startTime',
              key: 'startTime',
            }, {
              title: '结束时间',
              dataIndex: 'endTime',
              key: 'endTime',
            }, {
              title: '操作',
              key: 'operation',
              render: (text, record) => {
                return (
                  <div className='icon-manage'>
                      <a onClick={() => {edit(record)}}><Icon type="edit" /></a>
                      <a className='spin'>|</a>
                      <a onClick={() => {remove(record)}}><Icon type="delete" /></a>
                  </div>
                )
              }
            }];
}

export default createColumns
