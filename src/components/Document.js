import React, { Component } from 'react'
import Breadcrumb from 'antd/lib/breadcrumb'
import Folder from './Folder'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import FolderModal from './modals/Folder'

const BreadItem = Breadcrumb.Item

class Document extends Component{
    componentWillMount(){
        this.props.getFiles({location: ''})
    }
    handleOpenFolderModal = () => {
        this.props.setFolderVisible(true, 'add')
    }
    handleFolderModalCancel = () => {
        this.props.setFolderVisible(false)
    }
    handleAddFolder = (info) => {
        this.props.addFolder(info)
    }
    render(){
        console.log(this.props)
        const { fileList, folderVisible, method, record, setCurrentLocation, location, folderTree } = this.props
        let locationCurrent = location.split('/public/upload')[1]
        let locationArr = locationCurrent ? locationCurrent.split('/') : []
        let fileNodes = []
        fileList.map(function(file){
            fileNodes.push( <Folder onClick={setCurrentLocation} key={file._id} file={file} />)
        })
        let breadList = []
        breadList.push(<BreadItem key='all_document'>所有文档</BreadItem>  )
        locationArr.map(function(loca){
            if(loca){
                breadList.push(<BreadItem key='all_document'>{loca}</BreadItem>  )
            }
        })
        
        return (
            <div className='document'>
                <div className='document-manage'>
                    <Button onClick={this.handleOpenFolderModal}><Icon type='plus' />添加文件夹</Button>
                    <Button><Icon type='upload' />上传文件</Button>
                </div> 
                <div className='document-bread'>
                    当前位置：
                    <Breadcrumb separator='>'>
                        {breadList}
                    </Breadcrumb>
                </div>
                <div className='document-list'>
                    {fileNodes}
                </div>
                <FolderModal
                    tree={folderTree}
                    method={method}
                    record={record}
                    cancel={this.handleFolderModalCancel}
                    onAdd={this.handleAddFolder}
                    visible={folderVisible} />
            </div> 
        )
    }
}

export default Document
