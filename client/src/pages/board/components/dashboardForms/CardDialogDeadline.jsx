import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import DeadlineIcon from '@material-ui/icons/ScheduleOutlined';
import {KeyboardDatePicker} from '@material-ui/pickers';
import SectionContent from './SectionContent';
import Section from './Section';

// TODO: Remove state and integrate form react hooks

const CardDialogDeadline = () => {
  const [date, setDate] = useState(Date.now());
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDateChange = (val) => setDate(val);

  const TextFieldComponent = ({...props}) => (
    <TextField
      color="primary"
      {...props}
      inputProps={{disabled: true}}
      onClick={handleOpen}
    />
  );

  return (
    <Section deletable title="Deadline" titleIcon={DeadlineIcon}>
      <SectionContent>
        <KeyboardDatePicker
          id="deadline-date"
          name="deadline-date"
          open={open}
          onClose={handleClose}
          value={date}
          onChange={handleDateChange}
          inputVariant="standard"
          InputAdornmentProps={{color: 'primary'}}
          TextFieldComponent={TextFieldComponent}
          KeyboardButtonProps={{color: 'primary'}}
          disableToolbar
          autoOk
        />
      </SectionContent>
    </Section>
  );
};

export default CardDialogDeadline;
