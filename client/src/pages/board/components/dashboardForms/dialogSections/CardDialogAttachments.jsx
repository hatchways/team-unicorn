import React from 'react';
import AttachmentIcon from '@material-ui/icons/AttachFileOutlined';
import Section from './components/Section';
import SectionContent from './components/SectionContent';

const CardDialogAttachments = () => {
  return (
    <Section deletable title="Attachments" titleIcon={AttachmentIcon}>
      <SectionContent>Hi</SectionContent>
    </Section>
  );
};

export default CardDialogAttachments;
