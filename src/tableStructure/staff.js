import React from 'react'

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '电话',
  dataIndex: 'telephone',
  key: 'telephone',
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '登录密码',
  dataIndex: 'password',
  key: 'password',
}, {
  title: '部门',
  dataIndex: 'department',
  key: 'department',
}, {
  title: '权限',
  dataIndex: 'authority',
  key: 'authority',
}, {
  title: '操作',
  key: 'opration',
  render: () => {
    return 'ddd'
  }
}];

export default columns
