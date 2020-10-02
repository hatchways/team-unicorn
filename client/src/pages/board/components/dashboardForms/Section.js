import React, {useState} from 'react';
import {Box} from '@material-ui/core';
import SectionTitle from './SectionTitle';

const Section = React.forwardRef(
  (
    {name, title, titleIcon, optional, handleDelete, children, ...rest},
    ref,
  ) => {
    console.log('Rendered,', name);
    const [locked, setLocked] = useState(false);
    const deleteIconClickHandler = () => handleDelete(name);
    const lockIconClickHandler = (lockState) => setLocked(!lockState);
    return (
      <Box marginBottom={3} ref={ref} {...rest}>
        <SectionTitle
          deletable={optional}
          locked={locked}
          variant="h6"
          icon={titleIcon}
          handleDelete={deleteIconClickHandler}
          handleLock={lockIconClickHandler}
        >
          {title}
        </SectionTitle>
        {React.cloneElement(children, {locked})}
      </Box>
    );
  },
);

export default Section;
