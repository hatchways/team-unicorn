import React from 'react';
import {Box} from '@material-ui/core';
import SectionTitle from './SectionTitle';

const Section = ({deletable, title, titleIcon, children}) => {
  return (
    <Box marginBottom={3}>
      <SectionTitle deletable={deletable} variant="h6" icon={titleIcon}>
        {title}
      </SectionTitle>
      {children}
    </Box>
  );
};

export default Section;
