import React, {useState} from 'react';
import DescIcon from '@material-ui/icons/ImportContactsTwoTone';
import SectionContent from './SectionContent';
import Section from './Section';
import TextFieldOnFocusTypography from './TextFieldOnFocusTypography';

const CardDialogDesc = ({desc: initDesc}) => {
  const [desc, setDesc] = useState(initDesc);

  const save = (val) => setDesc(val);

  return (
    <Section name="description" title="Description" titleIcon={DescIcon}>
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
        />
      </SectionContent>
    </Section>
  );
};

export default CardDialogDesc;
