import {Box} from '@material-ui/core';
import React from 'react';

const CenteringBox = (props) => (
  <Box {...props} display="flex" alignItems="center" justifyContent="center" />
);
export default CenteringBox;
