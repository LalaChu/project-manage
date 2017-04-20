import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'

const createColumns = function(edit, remove){
    return [{
              title: '员工姓名',
              dataIndex: 'name',
              key: 'name',
            },{
              title: '标题',
              dataIndex: 'title',
              key: 'title',
            }, {
              title: '相关任务',
              dataIndex: 'taskId',
              key: 'taskId',
            }, {
              title: '详细内容',
              dataIndex: 'content',
              key: 'content',
            }, {
              title: '文件',
              dataIndex: 'documentId',
              key: 'document',
            },{
              title: '操作',
              key: 'operation',
              render: (text, record) => {
                return (
                  <div className='icon-manage'>
                      <a onClick={() => {edit(record)}}><Icon type="edit" /></a>
                  </div>
                )
              }
            }]
}

export default createColumns
