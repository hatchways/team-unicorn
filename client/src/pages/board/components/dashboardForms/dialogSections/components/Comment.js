import React from 'react';
import {IconButton, ListItem, ListItemSecondaryAction} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/HighlightOffRounded';
import TextFieldOnFocusTypography from './TextFieldOnFocusTypography';

// TODO: make it draggable to reorder?
const Comment = ({
  comment,
  disabled,
  timestamp,
  handleUpdate,
  handleDelete,
}) => {
  // If comment is empty, delete it.
  const saveComment = (value) => {
    if (!value) {
      handleDelete(timestamp);
    } else if (value !== comment) {
      handleUpdate(timestamp, value);
    }
  };

  const onDelete = () => handleDelete(timestamp);
  // NOTE: Consider using useMemo here?
  const TextFieldProps = {
    id: `card-comment-${timestamp}`,
    name: `card-comment-${timestamp}`,
    autoComplete: 'off',
    rows: 2,
    rowsMax: 6,
    fullWidth: true,
  };

  return (
    <ListItem alignItems="flex-start" disableGutters>
      <TextFieldOnFocusTypography
        TextFieldProps={TextFieldProps}
        text={comment}
        saveText={saveComment}
        placeholder="Enter a comment..."
        disabled={disabled}
      />
      <ListItemSecondaryAction>
        <IconButton
          disabled={disabled}
          size="small"
          color="secondary"
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default Comment;
