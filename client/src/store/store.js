import React, {createContext, useReducer} from 'react';

const initialState =[{numbers: [1, 2, 3], name:'col1'}, {numbers:[4, 5, 6], name: 'col2'}]

export const Store = createContext(initialState)

const addNum = (state, colName, num) => {
    const col = state[colName].numbers.concat(num)

    const newState = state.slice()
    newState[colName].numbers = col
    return newState
}

const moveNum = (state, from, to, index) => {
    const fromCol = state[from].numbers
    const num = fromCol[index]

    const newState = state.slice()
    newState[from].numbers = fromCol.slice(0, index).concat(fromCol.slice(index+1))
    newState[to].numbers = state[to].numbers.concat(num)
    return newState
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_NUM':
            return addNum(state, action.colName, action.num)
        case 'MOVE_NUM':
            return moveNum(state, action.from, action.to, action.index)
        default:
            return state;
    }
}

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <Store.Provider value={{state, dispatch}}> {children} </Store.Provider>
}