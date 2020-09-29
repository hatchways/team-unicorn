import React from 'react';
import {ListItem, ListItemText} from '@material-ui/core';

const Comment = ({comment}) => (
  <ListItem alignItems="flex-start" disableGutters>
    <ListItemText primary={comment} />
  </ListItem>
);
export default Comment;
