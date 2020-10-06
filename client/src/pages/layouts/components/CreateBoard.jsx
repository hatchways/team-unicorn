import React, {useState} from 'react';
import PlusIcon from '@material-ui/icons/AddOutlined';
import {Button} from '@material-ui/core';
import AddBoardDialogForm from '../../../components/dashboardForms/AddBoardDialogForm';

const CreateBoard = ({setBoards}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        startIcon={<PlusIcon />}
        size="large"
        onClick={handleClickOpen}
      >
        Create Board
      </Button>
      {open && (
        <AddBoardDialogForm
          open={open}
          setOpen={setOpen}
          setBoards={setBoards}
        />
      )}
    </>
  );
};

export default CreateBoard;
