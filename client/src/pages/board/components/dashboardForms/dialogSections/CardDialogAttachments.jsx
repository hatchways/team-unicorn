import React, {useState} from 'react';
import Section from './components/Section';
import SectionContent from './components/SectionContent';

const CardDialogAttachments = ({
  value: attachments,
  propName,
  dispatchUpdate,
  ...other
}) => {
  const [locked, setLocked] = useState(false);

  const toggleLock = () => setLocked((prevLockState) => !prevLockState);
  // TODO: Implement
  return (
    <Section locked={locked} handleToggleLock={toggleLock} {...other}>
      <SectionContent>Attachments</SectionContent>
    </Section>
  );
};

export default CardDialogAttachments;
