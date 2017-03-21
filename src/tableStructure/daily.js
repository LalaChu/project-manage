import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'

const createColumns = function(edit, remove){
    return [{
              title: '标题',
              dataIndex: 'title',
              key: 'title',
            }, {
              title: '类型',
              dataIndex: 'type',
              key: 'type',
            }, {
              title: '相关任务',
              dataIndex: 'taskId',
              key: 'taskId',
            }, {
              title: '日期',
              dataIndex: 'date',
              key: 'date',
              render: (text) => {
                return text.substr(0, 10)
              } 
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
                      <a className='spin'>|</a>
                      <a onClick={() => {remove(record)}}><Icon type="delete" /></a>
                  </div>
                )
              }
            }];
}

export default createColumns
