import {makeStyles, TextField, Typography} from '@material-ui/core';
import React, {useState, useRef} from 'react';
import DescIcon from '@material-ui/icons/ImportContactsTwoTone';
import SectionContent from './SectionContent';
import Section from './Section';
import TextFieldOnFocusTypography from './TextFieldOnFocusTypography';

const useStyles = makeStyles({
  blurred: {
    width: '100%',
    height: '100%',
  },
});

const CardDialogDesc = ({desc: initDesc}) => {
  const classes = useStyles();
  const [desc, setDesc] = useState(initDesc);
  const focusAreaRef = useRef(null);

  const save = (val) => setDesc(val);
  const TextFieldComponent = ({...props}) => (
    <TextField
      id="card-desc"
      name="card-desc"
      autoComplete="off"
      rows={2}
      rowsMax={6}
      placeholder="Enter a description..."
      margin="dense"
      multiline
      variant="outlined"
      fullWidth
      {...props}
    />
  );

  const TypographyComponent = ({...props}) => (
    <Typography className={classes.blurred} variant="body1" {...props}>
      {desc}
    </Typography>
  );

  console.log('Rendered Section');
  return (
    <Section title="Description" titleIcon={DescIcon} ref={focusAreaRef}>
      <SectionContent>
        <TextFieldOnFocusTypography
          TextFieldComponent={TextFieldComponent}
          TypographyComponent={TypographyComponent}
          text={desc}
          saveText={save}
          focusAreaRef={focusAreaRef}
        />
      </SectionContent>
    </Section>
  );
};

export default CardDialogDesc;
