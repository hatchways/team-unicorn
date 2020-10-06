import React, {useState} from 'react';
import SectionContent from './components/SectionContent';
import Section from './components/Section';
import TextFieldOnFocusTypography from './components/TextFieldOnFocusTypography';

const CardDialogDesc = ({value: desc, propName, dispatchUpdate, ...other}) => {
  const [locked, setLocked] = useState(false);

  const save = (val) => dispatchUpdate({[propName]: val});
  const toggleLock = () => setLocked((prevLocked) => !prevLocked);

  return (
    <Section locked={locked} handleToggleLock={toggleLock} {...other}>
      <SectionContent>
        <TextFieldOnFocusTypography
          TextFieldProps={{
            id: 'card-desc',
            name: 'card-desc',
            autoComplete: 'off',
            rows: 2,
            rowsMax: 6,
            fullWidth: true,
          }}
          placeholder="Enter a description..."
          text={desc}
          saveText={save}
          disabled={locked}
        />
      </SectionContent>
    </Section>
  );
};

export default CardDialogDesc;
