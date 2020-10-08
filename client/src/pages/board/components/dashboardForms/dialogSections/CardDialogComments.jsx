import React from 'react';
import {Box, Button, List} from '@material-ui/core';
import AddCommentIcon from '@material-ui/icons/AddCommentOutlined';
import SectionContent from './components/SectionContent';
import Comment from './components/Comment';
import Section from './components/Section';

// NOTE: Comments are saved as an object with
//       {
//          timestamp: Date,
//          comment: string,
//        }
//
//       This solely concerns frontend and it's
//       frontend's responsibility to assign a
//       timestamp upon creation.
//
//       As for why, to generate unique ids for
//       handling state logic.

const CardDialogComments = ({
  value: comments,
  propName,
  locked,
  toggleLock,
  dispatchUpdate,
  ...other
}) => {
  const setComments = (value) => dispatchUpdate({[propName]: value});

  const addComment = ({comment = ''}) => {
    const newComment = {timestamp: Date.now(), comment};
    const updatedComments = comments ? [...comments, newComment] : [newComment];
    setComments(updatedComments);
  };

  const updateComment = (timestamp, updatedComment) => {
    const updatedComments = comments.map((oldComment) => {
      if (oldComment.timestamp === timestamp) {
        const newComment = {...oldComment, comment: updatedComment};
        return newComment;
      }
      return oldComment;
    });
    setComments(updatedComments);
  };

  const deleteComment = (timestamp) => {
    const updatedComments = comments.filter(
      (comment) => comment.timestamp !== timestamp,
    );
    setComments(updatedComments);
  };

  return (
    <Section locked={locked} handleToggleLock={toggleLock} {...other}>
      <SectionContent>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="stretch"
        >
          <List disablePadding>
            {comments?.map(({comment, timestamp}) => (
              <Comment
                timestamp={timestamp}
                key={timestamp}
                comment={comment}
                handleUpdate={updateComment}
                handleDelete={deleteComment}
                disabled={locked}
              />
            ))}
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
              marginTop={1}
            >
              <Button
                variant="contained"
                size="small"
                color="default"
                startIcon={
                  <AddCommentIcon color={locked ? 'disabled' : 'action'} />
                }
                disabled={locked}
                edge="end"
                onClick={addComment}
              >
                Add comment
              </Button>
            </Box>
          </List>
        </Box>
      </SectionContent>
    </Section>
  );
};

export default CardDialogComments;
