import React from 'react';
import {Box} from '@material-ui/core';
import SectionTitle from './SectionTitle';

const Section = React.forwardRef(
  ({deletable, title, titleIcon, children, ...rest}, ref) => {
    return (
      <Box marginBottom={3} ref={ref} {...rest}>
        <SectionTitle deletable={deletable} variant="h6" icon={titleIcon}>
          {title}
        </SectionTitle>
        {children}
      </Box>
    );
  },
);

export default Section;
