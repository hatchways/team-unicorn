// import {Box} from '@material-ui/core';
import React, { useState, useContext } from 'react'
import { addNum, moveNum } from '../store/actions'
import { Store, StoreProvider } from '../store/store'


// const Card = (props) => {
//     return   <Box {...props}      
// >item</Box>
// }

const gridContainerStyle = { display: 'flex', flexDirection: 'row', height: "50em", alignItems: 'center', justifyContent: "center" }
/*
(<Container maxWidth='sm' style={{borderColor:"red"}}>
        <br/>
        <Grid
            container
            direction='column'
            spacing={3}

        >
            <Grid item
                alignItems="center"
                xs={4}
                >
                    <Card />
        </Grid>
 

        </Grid>

        <Grid 
            direction='column'
            container
            spacing={3}

>
<Grid item
                justify="center"
                alignItems="center"
                xs={4}
                >
                    <Card />
        </Grid>

            </Grid>

    </Container>


    )
*/

const AddNumKanban = () => {
    const { dispatch } = useContext(Store)
    const [colName, setColName] = useState(0)

    return <div>
        {/* <input type="radio" name="type" value="col1" />
        <input type="radio" name="type" value="col2" /> */}
        <button onClick={() => setColName(1 - colName) } type='button'>{`Switch to col${1 - colName}`}</button>
        <button onClick={() => addNum(7, colName, dispatch)} type='button'>AddNum</button>
    </div>

}

// const MoveNumKanban = () => {
//     const {state, dispatch} = useContext(Store)

//     const [moveData, setMoveData] = useState({'from':'col1', 'to': 'col2', 'index': 0})

//     const handleSubmit = e => {
//         e.preventDefault()
//         moveNum(moveData.from, moveData.to, moveData.index, dispatch)
//     }


//     return <form onSubmit={handleSubmit}>
//         <button type="submit">MoveNum</button>
//     </form>
// }
const Column = (props) => {
    const { dispatch } = useContext(Store)
    const { name, numbers } = props;
    const otherCol = 1 - name
    const moveData = { from: name, to: otherCol, index: 0 }


    const handleClick = (index) => {
        return (() => moveNum(moveData.from, moveData.to, index, dispatch))
    }
    return (
        <div>
            <h1>{`Col${name + 1}`}</h1>
            <ul style={{ listStyleType: "none", fontSize: "40px" }}>
                {numbers.map((num, index) => <li onKeyDown={handleClick(index)} onClick={handleClick(index) }> {num} </li>)}
            </ul>

        </div>
    )
}

const Board = () => {
    const { state } = useContext(Store)
    return <div style={gridContainerStyle}>
        {state.map((column, index) => {return <Column name={index} numbers={column.numbers} />})}
    </div>
}
const Kanban = () => {
    return (<StoreProvider>
        <Board />
        <AddNumKanban />
    </StoreProvider>)
}

export default Kanban;