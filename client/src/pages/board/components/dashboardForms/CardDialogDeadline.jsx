import React, {useState} from 'react';
import {DialogContent, TextField} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/ScheduleOutlined';
import {DatePicker, KeyboardTimePicker} from '@material-ui/pickers';
// import DateIcon from '@material-ui/icons/CalendarTodayOutlined';
import SectionTitle from './SectionTitle';

// TODO: Remove state and integrate form react hooks
// TODO: Improve styling
const CardDialogDeadline = () => {
  const [date, setDate] = useState(Date.now());
  const [time, setTime] = useState(Date.now());

  const handleDateChange = (val) => setDate(val);
  const handleTimeChange = (val) => setTime(val);
  const PickerTextFieldComponent = ({children, ...forwarded}) => (
    <TextField
      variant="outlined"
      color="primary"
      margin="dense"
      size="small"
      {...forwarded}
    >
      {children}
    </TextField>
  );

  return (
    <DialogContent>
      <SectionTitle variant="h6" icon={ScheduleIcon}>
        Deadline
      </SectionTitle>
      <DatePicker
        id="deadline-date"
        name="deadline-date"
        value={date}
        onChange={handleDateChange}
        disableToolbar
        autoOk
        TextFieldComponent={PickerTextFieldComponent}
      />
      <div>
        <KeyboardTimePicker
          disableToolbar
          minutesStep={5}
          value={time}
          onChange={handleTimeChange}
          TextFieldComponent={PickerTextFieldComponent}
        />
      </div>
    </DialogContent>
  );
};

export default CardDialogDeadline;
