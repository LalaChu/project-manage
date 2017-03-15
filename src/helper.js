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
