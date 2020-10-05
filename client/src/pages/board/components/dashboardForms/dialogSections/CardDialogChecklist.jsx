import React, {useState} from 'react';
import {Box, List, Button} from '@material-ui/core';
import AddItemIcon from '@material-ui/icons/PlaylistAddRounded';
import ChecklistItem from './components/ChecklistItem';
import Section from './components/Section';
import SectionContent from './components/SectionContent';

const CardDialogChecklist = ({initState: initChecklistItems, ...other}) => {
  const [checklist, setChecklist] = useState(initChecklistItems || []);
  const [locked, setLocked] = useState(false);

  const toggleLock = () => setLocked((prevLockState) => !prevLockState);

  const addItem = ({checked = false, text = ''}) => {
    const newChecklistItem = {timestamp: Date.now(), text, checked};
    const updatedChecklist = [...checklist, newChecklistItem];
    setChecklist(updatedChecklist);
  };

  const toggleItem = (timestamp, updatedCheckState) => {
    const updatedChecklist = checklist.map((oldItem) => {
      if (oldItem.timestamp === timestamp) {
        const {text} = oldItem;
        return {text, timestamp, checked: updatedCheckState};
      }
      return oldItem;
    });
    setChecklist(updatedChecklist);
  };

  const deleteItem = (timestamp) => {
    const updatedChecklist = checklist.filter(
      (item) => item.timestamp !== timestamp,
    );
    setChecklist(updatedChecklist);
  };

  const updateItemText = (timestamp, updatedText) => {
    if (!updatedText) {
      deleteItem(timestamp);
      return;
    }

    const updatedChecklist = checklist.map((oldItem) => {
      if (oldItem.timestamp === timestamp) {
        const {checked} = oldItem;
        return {text: updatedText, timestamp, checked};
      }
      return oldItem;
    });
    setChecklist(updatedChecklist);
  };

  return (
    <Section locked={locked} handleToggleLock={toggleLock} optional {...other}>
      <SectionContent>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="stretch"
        >
          <List disablePadding>
            {checklist.map(({text, checked, timestamp}) => (
              <ChecklistItem
                key={timestamp}
                id={`card-checklist-item-${timestamp}`}
                name={`card-checklist-item-${timestamp}`}
                color="primary"
                size="medium"
                text={text}
                timestamp={timestamp}
                checked={checked}
                handleToggle={toggleItem}
                handleTextChange={updateItemText}
                handleDelete={deleteItem}
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
                color="action"
                startIcon={
                  <AddItemIcon color={locked ? 'disabled' : 'action'} />
                }
                disabled={locked}
                edge="end"
                onClick={addItem}
              >
                Add item
              </Button>
            </Box>
          </List>
        </Box>
      </SectionContent>
    </Section>
  );
};

export default CardDialogChecklist;
