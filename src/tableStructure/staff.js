import React from 'react'
import Icon from 'antd/lib/icon'
import * as Authority from '../constants/authority'



const createColumns = function(edit, remove){
  return  [{
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              width: 100
            }, {
              title: '电话',
              dataIndex: 'telephone',
              key: 'telephone',
              width: 100
            }, {
              title: '邮箱',
              dataIndex: 'email',
              key: 'email',
              width: 100
            },{
              title: '部门',
              dataIndex: 'departmentName',
              key: 'departmentName',
              width: 100,
              render: (e) => {
                // console.log(e)
                return (
                  <div>{e[0]}{e[1] ? ' > ' : ''}{e[1]}</div>
                )
              }
            }, {
              title: '权限',
              dataIndex: 'authority',
              key: 'authority',
              width: 100,
              render: (text) => {
                return Authority[text]
              }
            }, {
              title: '操作',
              key: 'opration',
              width: 100,
              render: (text ,record) => {
                return (
                  <div className='icon-manage'>
                      <a onClick={() => {edit(record)}}><Icon type="edit" /></a>
                      <a className='spin'>|</a>
                      <a onClick={() => {remove(record)}}><Icon type="delete" /></a>
                  </div>
                )
              },
            }];
}

export default createColumns
