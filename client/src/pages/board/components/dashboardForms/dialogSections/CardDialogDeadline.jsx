import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers';
import SectionContent from './components/SectionContent';
import Section from './components/Section';

const CardDialogDeadline = ({
  value: deadline,
  propName,
  locked,
  toggleLock,
  dispatchUpdate,
  ...other
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDateChange = (date) =>
    dispatchUpdate({[propName]: date.getTime()});

  const TextFieldComponent = ({...props}) => (
    <TextField
      color="primary"
      {...props}
      inputProps={{disabled: true}}
      onClick={locked ? null : handleOpen}
    />
  );

  return (
    <Section locked={locked} handleToggleLock={toggleLock} {...other}>
      <SectionContent>
        <KeyboardDatePicker
          id="deadline-date"
          name="deadline-date"
          open={open}
          onClose={handleClose}
          value={deadline}
          onChange={handleDateChange}
          inputVariant="standard"
          InputAdornmentProps={{color: 'primary'}}
          TextFieldComponent={TextFieldComponent}
          KeyboardButtonProps={{color: 'primary'}}
          disableToolbar
          autoOk
          disabled={locked}
        />
      </SectionContent>
    </Section>
  );
};

export default CardDialogDeadline;
