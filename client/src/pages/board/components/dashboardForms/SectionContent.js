import React from 'react';
import WithIcon from '../../../../components/WithIcon';

const SectionContent = ({children, ...other}) => {
  return (
    <WithIcon aligner>{React.cloneElement(children, {...other})}</WithIcon>
  );
};

export default SectionContent;
