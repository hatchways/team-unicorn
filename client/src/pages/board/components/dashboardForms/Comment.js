import React, {useState} from 'react';
import {ListItem, ListItemText, TextField} from '@material-ui/core';

const Comment = ({comment: initComment, id, handleUpdate, handleDelete}) => {
  const [comment, setComment] = useState(initComment);
  const [isEditing, setIsEditing] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const updateComment = (e) => {
    if (e.target.value) {
      setComment(e.currentTarget.value);
      setIsEditing(false);
      handleUpdate(id, comment);
    } else {
      handleDelete(id);
    }
  };
  return (
    <ListItem
      alignItems="flex-start"
      disableGutters
      onClick={isEditing ? null : handleFocus}
    >
      {isEditing ? (
        <TextField
          id={`comment-${id}`}
          name="card-desc"
          autoComplete="off"
          defaultValue={comment}
          rows={2}
          rowsMax={6}
          margin="dense"
          multiline
          variant="outlined"
          fullWidth
          onBlur={updateComment}
        />
      ) : (
        <ListItemText primary={comment} />
      )}
    </ListItem>
  );
};
export default Comment;
