import React from 'react';
import {Button} from '@material-ui/core';
import {saveBoard} from '../../../../api/Board';

const SaveBoardButton = (props) => {
  const {state} = props;

  const updateColumnOrder = async () => {
    await saveBoard(state.id, {columns: state.columnOrder});
  };

  return (
    <Button onClick={updateColumnOrder} variant="contained">
      Save Board
    </Button>
  );
};

export default SaveBoardButton;
