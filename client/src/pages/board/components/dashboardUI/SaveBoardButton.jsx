import React from 'react';
import {Button} from '@material-ui/core';
import Board from 'api/Board';

const SaveBoardButton = (props) => {
  const {state} = props;

  const updateColumnOrder = async () => {
    await Board.saveData(state.id, {columns: state.columnOrder});
  };

  return (
    <Button onClick={updateColumnOrder} variant="contained">
      Save Board
    </Button>
  );
};

export default SaveBoardButton;
