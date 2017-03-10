import React, { Component } from 'react'
import SidebarContainer from '../containers/Sidebar'
import MainSection from './Mainsection.js'
import Layout from 'antd/lib/layout'

class App extends Component{
    render(){
        let children = this.props.children
        let currentMenu = this.props.routes[this.props.routes.length-1].path
        return (
            <Layout>
                <SidebarContainer currentMenu={currentMenu}/>
                <MainSection children={children}></MainSection>
            </Layout>
        )
    }
}

export default App
