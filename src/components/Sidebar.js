import React, { Component } from 'react'
import Menu from 'antd/lib/menu'
import { Link } from 'react-router'
import { Sider } from 'antd/lib/layout'


const SubMenu = Menu.SubMenu

class Sidebar extends Component{
    render(){
        return (
            <Sider>
                <div className='user-info'>ddd</div>
                <Menu
                    defaultSelectedKeys={[this.props.currentMenu]}
                    mode='inline'
                    onClick={(e) => {this.props.onClick(e)}}
                    >
                    <Menu.Item key='view'>
                        <Link to='/view'>首页</Link>
                    </Menu.Item>
                    <Menu.Item key='process'>
                        <Link to='/process'>进度</Link>
                    </Menu.Item>
                    <Menu.Item key='project'>
                        <Link to='project'>项目</Link>
                    </Menu.Item>
                    <SubMenu key='document' title='文档' />
                    <SubMenu key='approval' title='审批'></SubMenu>
                    <SubMenu key='daily' title='日报' />
                    <SubMenu key='organization' title='组织' />
                    <Menu.Item key='self'>
                        <Link to='personal'>个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key='logout'>
                        <span>退出系统</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar
