export const addNum = (num, colName, dispatch) => {
    dispatch({
        type: 'ADD_NUM',
        num: num,
        colName: colName
    })
}

export const moveNum = (from, to, index, dispatch) => {
    dispatch({
        type: 'MOVE_NUM',
        from: from,
        to: to,
        index: index
    })
}
