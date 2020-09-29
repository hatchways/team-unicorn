import React, {useState} from 'react';
import {IconButton} from '@material-ui/core/';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircle';

import AddColumnDialogForm from '../dashboardForms/AddColumnDialogForm';

const AddColumn = ({boardId, setLoadBoard}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  return (
    <>
      <div className="addColumnContent">
        <a href="/#" onClick={handleClickOpen}>
          <IconButton edge="start" aria-label="menu">
            <AddCircleOutlineIcon />
          </IconButton>
        </a>
      </div>
      {open && (
        <AddColumnDialogForm
          open={open}
          setOpen={setOpen}
          boardId={boardId}
          setLoadBoard={setLoadBoard}
        />
      )}
    </>
  );
};
export default AddColumn;
