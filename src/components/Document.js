import React, { Component } from 'react'
import Breadcrumb from 'antd/lib/breadcrumb'
import Folder from './Folder'
import Button from 'antd/lib/button'

const BreadItem = Breadcrumb.Item

class Document extends Component{
    componentWillMount(){
        this.props.getFiles({location: ''})
    }
    render(){
        console.log(this.props)
        const { fileList } = this.props
        let fileNodes = []
        fileList.forEach(function(file){
            fileNodes.push( <Folder key={file} title={file} />)
        })
        let breadList = []
        breadList.push(<BreadItem key='all_document'>所有文档</BreadItem>  )
        return (
            <div className='document'>
                <Breadcrumb className='document-bread'>
                    {breadList}
                    
                </Breadcrumb>
                <div>
                    {fileNodes}
                </div>
            </div>
        )
    }
}

export default Document
