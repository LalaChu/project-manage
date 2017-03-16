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
