import {TextField} from '@material-ui/core';
import React from 'react';
import DescIcon from '@material-ui/icons/ImportContactsTwoTone';
import SectionTitle from './SectionTitle';
import SectionContent from './SectionContent';

const CardDialogDesc = ({desc}) => {
  return (
    <>
      <SectionTitle icon={DescIcon} variant="h6">
        Description
      </SectionTitle>
      <SectionContent>
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
      </SectionContent>
    </>
  );
};

export default CardDialogDesc;
