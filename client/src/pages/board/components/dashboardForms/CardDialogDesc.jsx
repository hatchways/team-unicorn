import {TextField} from '@material-ui/core';
import React from 'react';
import DescIcon from '@material-ui/icons/ImportContactsTwoTone';
import SectionContent from './SectionContent';
import Section from './Section';

const CardDialogDesc = ({desc}) => {
  return (
    <Section title="Description" titleIcon={DescIcon}>
      <SectionContent>
        <TextField
          id="card-desc"
          name="card-desc"
          autoComplete="off"
          defaultValue={desc}
          rows={2}
          rowsMax={6}
          placeholder="Enter a description..."
          margin="dense"
          multiline
          variant="outlined"
          fullWidth
        />
      </SectionContent>
    </Section>
  );
};

export default CardDialogDesc;
