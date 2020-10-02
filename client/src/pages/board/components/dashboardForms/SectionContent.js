import React from 'react';
import WithIcon from '../../../../components/WithIcon';

const SectionContent = ({locked, children}) => {
  return <WithIcon aligner>{React.cloneElement(children, {locked})}</WithIcon>;
};

export default SectionContent;
