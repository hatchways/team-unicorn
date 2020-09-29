import React from 'react';
import {Box, DialogContent, makeStyles} from '@material-ui/core';
import CardDialogDesc from './CardDialogDesc';
import CardDialogDeadline from './CardDialogDeadline';
import CardDialogComments from './CardDialogComments';
import CardDialogAttachments from './CardDialogAttachments';
import CardDialogTags from './CardDialogTags';
import CardDialogButtonMenu from './CardDialogButtonMenu';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(3),
  },
}));

const CardDialogContentBody = ({
  desc,
  deadline,
  comments,
  tags,
  attachments,
}) => {
  const classes = useStyles();

  return (
    <DialogContent className={classes.dialogContent}>
      <Box
        display="flex"
        flexGrow={3}
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <CardDialogDesc desc={desc} />
        <CardDialogDeadline date={deadline} />
        <CardDialogComments comments={comments} />
        <CardDialogAttachments attachments={attachments} />
        <CardDialogTags tags={tags} />
      </Box>
      <Box
        flexGrow={1}
        alignSelf="stretch"
        position="sticky"
        top={0}
        marginLeft={3}
      >
        <CardDialogButtonMenu />
      </Box>
    </DialogContent>
  );
};

export default CardDialogContentBody;
