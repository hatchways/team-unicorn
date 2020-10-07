import React from 'react';
import Section from './components/Section';
import SectionContent from './components/SectionContent';

const CardDialogAttachments = ({
  value: attachments,
  propName,
  locked,
  toggleLock,
  dispatchUpdate,
  ...other
}) => {
  // TODO: Implement
  return (
    <Section locked={locked} handleToggleLock={toggleLock} {...other}>
      <SectionContent>Attachments</SectionContent>
    </Section>
  );
};

export default CardDialogAttachments;
