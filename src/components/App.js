import React, { Component } from 'react'
import SidebarContainer from '../containers/Sidebar'
import MainSection from './Mainsection.js'
import Layout from 'antd/lib/layout'

class App extends Component{
    render(){
        let children = this.props.children
        
        let currentMenu = this.props.routes[this.props.routes.length-1].path 
        let openNow
        if(this.props.routes.length > 1){
            openNow = this.props.routes[this.props.routes.length-2].path
        }
        openNow = openNow ? openNow : ''
        return (
            <Layout>
                <SidebarContainer currentMenu={currentMenu} openNow={openNow}/>
                <MainSection children={children}></MainSection>
            </Layout>
        )
    }
}

export default App
