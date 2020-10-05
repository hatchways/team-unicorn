const boardActions = {
    addCard: (task, columnId, dispatch) => {
        dispatch({
            type: "ADD_CARD",
            columnId: columnId,
            task: task
        })
    },
    moveCard: (prevCol, nextCol, fromIndex, toIndex, dispatch) => {
        dispatch({
            type: "MOVE_CARD",
            prevCol: prevCol,
            nextCol: nextCol,
            fromIndex: fromIndex,
            toIndex: toIndex  
        })
    },
    addColumn: (col, dispatch) => {
        dispatch({
            type: "ADD_COL",
            col: col,
        })
    },
    moveColumn: (fromIndex, toIndex, dispatch) => {
        dispatch({
            type: "MOVE_COL",
            fromIndex: fromIndex,
            toIndex: toIndex
        })
    },
    initBoard: (board, dispatch) => {
        dispatch({
            type: "INIT_BOARD",
            boardData: board
        })
    }
}

export default boardActions;