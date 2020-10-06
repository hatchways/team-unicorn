import React, {useState} from 'react';
import {IconButton} from '@material-ui/core/';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircle';

import AddColumnDialogForm from '../dashboardForms/AddColumnDialogForm';

const AddColumnSidebar = ({boardId, data, currentBoard}) => {
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
          currentBoard={currentBoard}
          boardId={boardId}
          data={data}
        />
      )}
    </>
  );
};
export default AddColumnSidebar;
