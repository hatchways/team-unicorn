import React, {useState} from 'react';
import {Box, DialogContent, makeStyles} from '@material-ui/core';
import CardDialogDesc from './CardDialogDesc';
import CardDialogDeadline from './CardDialogDeadline';
// import CardDialogComments from './CardDialogComments';
// import CardDialogAttachments from './CardDialogAttachments';
// import CardDialogTags from './CardDialogTags';
import CardDialogButtonMenu from './CardDialogButtonMenu';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

// TODO: Refactor hardcoded section names into enums.
const CardDialogContentBody = ({
  desc,
  deadline,
  // comments,
  // tags,
  // attachments,
}) => {
  const classes = useStyles();
  const [sections, setSections] = useState(['description', 'deadline']);

  const addSection = (name) => {
    if (!sections.includes(name)) {
      const updated = [...sections, name];
      setSections(updated);
    }
  };

  const deleteSection = (name) => {
    const updated = sections.filter((secName) => secName !== name);
    setSections(updated);
  };

  // TODO: Ensure state changes don't re-render every section
  return (
    <DialogContent className={classes.root}>
      <Box
        display="flex"
        alignItems="stretch"
        flexGrow={1}
        flexDirection="column"
        justifyContent="space-evenly"
        paddingBottom={3}
      >
        {sections.includes('description') && (
          <CardDialogDesc handleDelete={deleteSection} desc={desc} />
        )}
        {sections.includes('deadline') && (
          <CardDialogDeadline handleDelete={deleteSection} date={deadline} />
        )}
        {/* 
        <CardDialogComments handleDelete={deleteSection} comments={comments} />
        <CardDialogAttachments
          handleDelete={deleteSection}
          attachments={attachments}
        />
        <CardDialogTags handleDelete={deleteSection} tags={tags} /> */}
      </Box>
      <Box
        width="130px"
        minWidth="130px"
        maxWidth="130px"
        alignSelf="stretch"
        position="sticky"
        top={0}
        marginLeft={3}
      >
        <CardDialogButtonMenu handleAdd={addSection} />
      </Box>
    </DialogContent>
  );
};

export default CardDialogContentBody;
