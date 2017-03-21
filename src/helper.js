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
