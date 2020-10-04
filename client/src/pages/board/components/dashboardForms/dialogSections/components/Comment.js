import React from 'react';
import {ListItem} from '@material-ui/core';
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
    </ListItem>
  );
};
export default Comment;
