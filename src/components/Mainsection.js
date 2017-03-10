import React, { Component } from 'react'


class MainSection extends Component{
    render(){
        return (
            <section className='main-content'>
                {this.props.children}
            </section>
        )
    }
}
export default MainSection
