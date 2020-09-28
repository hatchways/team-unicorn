import {TextField} from '@material-ui/core';
import React from 'react';
import DescIcon from '@material-ui/icons/ImportContactsTwoTone';
import SectionTitle from './SectionTitle';

const CardDialogDesc = ({desc}) => {
  return (
    <>
      <SectionTitle icon={DescIcon} variant="h6">
        Description
      </SectionTitle>
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
    </>
  );
};

export default CardDialogDesc;
