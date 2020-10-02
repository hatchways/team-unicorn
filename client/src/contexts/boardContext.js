import React, {createContext, useEffect, useReducer, useState} from 'react';
import Board from '../api/Board';
 

const initialState = {
    id: null,
    columns: {},
    columnOrder: [],
    tasks: {}
}
const BoardContext = createContext(initialState)

const reducers = {
    addCard: (state, task, colId) => {
        const newState = {...state}
        newState.tasks[task.id] = {id: task.id, content: task.name}
        newState.columns[colId].taskIds.push(task.id)
        return newState;
    },
    moveCard: (state, prevCol, nextCol, oldIndex, newIndex) => {
        const newState = {...state}
        const taskId = newState.columns[prevCol].taskIds[oldIndex]
        newState.columns[prevCol].taskIds.splice(oldIndex, 1)
        newState.columns[nextCol].taskIds.splice(newIndex, 0, taskId)
        return newState;
    },
    addCol: (state, col) => {
        const newState = {...state}
        newState.columnOrder.push(col.id)
        newState.columns[col.id] = col
        return newState;
    },
    moveCol: (state, fromIndex, toIndex) => {
        const newState = {...state}
        const col = newState.columnOrder[fromIndex]
        newState.columnOrder.splice(fromIndex, 1);
        newState.columnOrder.splice(toIndex, 0, col);
        return newState;
    },
    initBoard: (boardData) => {
        return boardData
    }
}


const boardReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return reducers.addCard(state, action.task, action.columnId)
        case 'MOVE_CARD':
            return reducers.moveCard(state, action.prevCol, action.nextCol, action.fromIndex, action.toIndex)
        case 'ADD_COL':
            return reducers.addCol(state, action.col)
        case 'MOVE_COL':
            return reducers.moveCol(state, action.fromIndex, action.toIndex)
        case 'INIT_BOARD':
            return reducers.initBoard(action.boardData)
        default:
            return state;
    }
}

const BoardProvider = ({children}) => {

    //const [data, setBoardState] = useState(initialState)
    const [data, dispatch] = useReducer(boardReducer, initialState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const board = await Board.getData()
                dispatch({
                    type: 'INIT_BOARD',
                    boardData: board.data
                })
                setLoading(false)
            } catch(e) {
                console.error(e)
            }
        }
        fetchData()
    }, [])
    

    // const [state, setState] = useState(initialState)
    return (
        <BoardContext.Provider 
            value={{
                data, 
                dispatch,
                loading
            }
                }> 
            {children} 
        </BoardContext.Provider>
    )
} 

export {BoardContext, BoardProvider}