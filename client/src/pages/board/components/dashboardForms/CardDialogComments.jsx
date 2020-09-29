import {Box, List, ListItem, TextField} from '@material-ui/core';
import React from 'react';
import CommentsIcon from '@material-ui/icons/ForumOutlined';
import SectionTitle from './SectionTitle';
import SectionContent from './SectionContent';
import Comment from './Comment';
import Section from './Section';

const CardDialogComments = ({comments}) => {
  return (
    <Section>
      <SectionTitle icon={CommentsIcon} variant="h6">
        Comments
      </SectionTitle>
      <SectionContent>
        <Box display="flex" flexDirection="column" alignItems="stretch">
          <List disablePadding>
            {comments.map((comment) => (
              <Comment key={comment} comment={comment} />
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
