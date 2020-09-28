import React from 'react';
import {Dialog} from '@material-ui/core';
import CardDialogTitle from './CardDialogTitle';
import CardDialogDesc from './CardDialogDesc';
import CardDialogDeadline from './CardDialogDeadline';

const CardDialog = ({
  title,
  columnName,
  desc,
  deadline,
  tags,
  color,
  comments,
  attachements,
  onClose,
  ...rest
}) => {
  const subtitle = `In list "${columnName}"`;
  return (
    <Dialog onClose={onClose} {...rest}>
      <CardDialogTitle onClose={onClose} color={color} subtitle={subtitle}>
        {title}
      </CardDialogTitle>
      <CardDialogDesc> {desc}</CardDialogDesc>
      <CardDialogDeadline date={deadline} />
    </Dialog>
  );
};

export default CardDialog;
