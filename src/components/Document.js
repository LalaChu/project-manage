import React, { Component } from 'react'
import Breadcrumb from 'antd/lib/breadcrumb'
import Folder from './Folder'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import FolderModal from './modals/Folder'
import { getFolderNameByPath } from '../helper'

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
    getPathByIndex = (index) => {
        let { location } = this.props
        let locationCurrent = location.split('/public/upload')[1]
         let locationArr = locationCurrent ? locationCurrent.split('/') : []
        locationArr.splice(index + 1)
        return location.split('/public/upload')[0] + '/public/upload' + locationArr.join('/')
    }
    render(){
        console.log(this.props)
        const { fileList, folderVisible, method, record, setCurrentLocation, 
                location, folderTree, setFolderVisible, editFolder } = this.props
        let locationCurrent = location.split('/public/upload')[1]
        let locationArr = locationCurrent ? locationCurrent.split('/') : []
        let fileNodes = []
        fileList.map(function(file){
            fileNodes.push( <Folder onEdit={setFolderVisible} onClick={setCurrentLocation} key={file._id} file={file} />)
        })
        let breadList = []
        breadList.push(<BreadItem key='all'><a href='javascript: void(0)'  onClick={() => {setCurrentLocation('')}}>所有文档</a></BreadItem>  )
        let index = 0;
        let getPathByIndex = this.getPathByIndex

        locationArr.map(function(loca){
            if(loca){
                let path = getPathByIndex(index)
                breadList.push(<BreadItem key={index}><a href="javascript:void(0)" onClick={() => {setCurrentLocation(path)}}>{getFolderNameByPath(folderTree, path)}</a> </BreadItem>  )
            }
            index++;
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
                    visible={folderVisible}
                    onEdit={editFolder} />
            </div> 
        )
    }
}

export default Document
