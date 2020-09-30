import {Box, List, ListItem, TextField} from '@material-ui/core';
import React, {useState} from 'react';
import CommentsIcon from '@material-ui/icons/ForumOutlined';
import SectionContent from './SectionContent';
import Comment from './Comment';
import Section from './Section';

const CardDialogComments = ({comments: initComments}) => {
  const [comments, setComments] = useState(initComments);

  const updateComment = (id, updatedText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {...comment, comment: updatedText};
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id === id);
    setComments(updatedComments);
  };

  return (
    <Section deletable title="Comments" titleIcon={CommentsIcon}>
      <SectionContent>
        <Box display="flex" flexDirection="column" alignItems="stretch">
          <List disablePadding>
            {comments.map(({comment, id}) => (
              <Comment
                id={id}
                key={id}
                comment={comment}
                handleUpdate={updateComment}
                handleDelete={deleteComment}
              />
            ))}
            <ListItem disableGutters>
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
            </ListItem>
          </List>
        </Box>
      </SectionContent>
    </Section>
  );
};

export default CardDialogComments;
