import {Box, TextField, Typography} from '@material-ui/core';
import React from 'react';
import CommentsIcon from '@material-ui/icons/ForumOutlined';
import SectionTitle from './SectionTitle';
import SectionContent from './SectionContent';

const Comment = ({children}) => (
  <Typography variant="body1">{children}</Typography>
);

const CardDialogComments = ({comments}) => {
  return (
    <>
      <SectionTitle icon={CommentsIcon} variant="h6">
        Comments
      </SectionTitle>
      <SectionContent>
        <Box display="flex" flexDirection="column" alignItems="stretch">
          {comments.map((comment) => (
            <Comment key={comment}>{comment}</Comment>
          ))}
          <TextField
            id="dialog-comment"
            name="dialog-comment"
            type="text"
            placeholder="Leave a new comment..."
            multiline
            rows={2}
            rowsMax={6}
            variant="outlined"
            fullWidth
          />
        </Box>
      </SectionContent>
    </>
  );
};

export default CardDialogComments;
