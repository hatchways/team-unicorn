import {
  DialogContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import DescIcon from '@material-ui/icons/ImportContactsTwoTone';
import TextWithIcon from '../../../../components/TextWithIcon';

const useStyles = makeStyles({
  labelText: {
    fontWeight: 'bold',
  },
});

const CardDialogDesc = ({desc}) => {
  const classes = useStyles();
  return (
    <DialogContent dividers>
      <TextWithIcon Icon={DescIcon} iconColor="primary">
        <Typography className={classes.labelText} variant="h6">
          Description
        </Typography>
      </TextWithIcon>
      <TextField
        id="card-desc"
        name="card-desc"
        autoComplete="off"
        defaultValue={desc}
        rows={2}
        rowsMax={6}
        placeholder="Enter a description..."
        margin="normal"
        multiline
        variant="outlined"
        fullWidth
      />
    </DialogContent>
  );
};

export default CardDialogDesc;
