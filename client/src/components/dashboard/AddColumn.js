import React, {useState} from 'react';
import {IconButton} from '@material-ui/core/';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircle';

import AddColumnDialogForm from '../dashboardForms/AddColumnDialogForm';

const AddColumn = (props) => {
  const {newColumn, setNewColumn, boardId} = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  return (
    <div>
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
          newColumn={newColumn}
          setNewColumn={setNewColumn}
          boardId={boardId}
        />
      )}
    </div>
  );
};
export default AddColumn;
