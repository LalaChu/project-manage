import React, { Component } from 'react'
import Breadcrumb from 'antd/lib/breadcrumb'
import Folder from './Folder'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import FolderModal from './modals/Folder'
import { getFolderNameByPath } from '../helper'
import Modal from 'antd/lib/modal'
import Notification from 'antd/lib/notification'
import FileModal from './modals/File'
import File from './File'

const confirm = Modal.confirm

const BreadItem = Breadcrumb.Item

class Document extends Component{
    componentWillUpdate(){
        if(this.props.needFetch){
            this.props.getFiles({parentPath: this.props.location})
        }
    }
    componentDidUpdate(){
        const { msg } = this.props
        if(msg){
            let description = '', icon 
            if(msg === 'success'){
                description = '恭喜您，操作成功'
                icon = <Icon type="smile-circle" style={{ color: '#108ee9' }} />
            }else if(msg !== ''){
                description = '对不起，操作失败，请重试'
                icon = <Icon type="frown-o" style={{ color: '#108ee9' }}/>
            }else{
                return
            }
            Notification.open({
                message: '文件管理通知',
                description: description,
                icon: icon,
            });
        }
    }
    componentWillMount(){
        this.props.getFiles({location: ''})
    }
    handleOpenFolderModal = () => {
        this.props.setFolderVisible(true, 'add')
    }
    handleOpenFileModal = () => {
        this.props.setFileVisible(true, 'add')
    }
    handleFolderModalCancel = () => {
        this.props.setFolderVisible(false)
    }
    handleFileModalCancel = () => {
        this.props.setFileVisible(false)
    }
    handleAddFolder = (info) => {
        this.props.addFolder(info)
    }
    handleRemove = (info) => {
        confirm({
            title: '确认删除该文件夹吗？',
            content: '该文件夹内的所有文件和文件夹都将被删除，该操作无法还原，请谨慎操作',
            onCancel: () => {},
            onOk: () => {
                this.props.deleteFolder(info)
            }
        })
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
                location, folderTree, setFolderVisible, editFolder, deleteFolder,
                fileVisible, setFileVisible, removeFile } = this.props
        let locationCurrent = location.split('/public/upload')[1]
        let locationArr = locationCurrent ? locationCurrent.split('/') : []
        let fileNodes = []
        let handleRemove = this.handleRemove
        fileList.map(function(file){
            if(file.pathId === undefined){
                fileNodes.push( <Folder
                    onRemove={handleRemove}
                    onEdit={setFolderVisible} 
                    onClick={setCurrentLocation} 
                    key={file._id} 
                    file={file} />)
            }else{
                fileNodes.push(
                    <File 
                        key={file._id} 
                        file={file}
                        onEdit={setFileVisible}
                        onRemove={removeFile}
                        />
                )
            }
            
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
                    <Button onClick={this.handleOpenFileModal}><Icon type='upload' />上传文件</Button>
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
                <FileModal
                    tree={folderTree}
                    cancel={this.handleFileModalCancel}
                    onEdit={this.props.editFile}
                    visible={fileVisible}
                    method={method}
                    record={record}
                />
            </div> 
        )
    }
}

export default Document
