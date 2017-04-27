import moment from 'moment'
export const addKeyColumns = function(data){
    return data.map((e) => {
        return {
            ...e,
            key: e.objectId
        }
    })
}

export const getDataFromRef = function(refs){
    console.log(refs)
}

export const getTitleByMethod = function(method){
    switch(method){
        case 'add':return '添加'
        case 'edit':return '编辑'
        case 'view':return '查看'
        default: return '添加'
    }
}

export const getParentId = function(list, id){
    let parentId = ''
    list.forEach(function(one){
        if(!one.children){
            return ''
        }
        if(one.children.length && one._id !== id){
            one.children.forEach(function(item){
                if(item._id === id){
                    parentId = one._id
                }
            })
        }
    })
    return parentId
}

export const getFolderNameByPath = function(tree, path){
    if(path.indexOf('daily') > 0){
        return 'daily'
    }
    let findName = ''
    function deepFind(target, path){
        if(target.path === path){
            findName = target.name
        }else{
            let basePath = '/public/upload/'
            let targetArr = target.path.split(basePath)[1].split('/');
            let findArr = path.split(basePath)[1].split('/');
            if(targetArr[0] === findArr[0] && target.children.length){
                target.children.map(function(child){
                    deepFind(child, path)
                })
                
            }
        }
    }
    tree.map(function(target){
        deepFind(target, path)
    })
    return findName
    // return 'dddd'
}

export const getMaxAndMinDate = function(list){
    let max = moment(list[0].endTime)
    let min = moment(list[0].startTime)
    list.map(function(item){
        min = moment.min(moment(item.startTime), min)
        max = moment.max(moment(item.endTime), max)
    })
    return {
        min,
        max
    }
}
