import React from 'react';
import {Dialog} from '@material-ui/core';
import CardDialogTitle from './CardDialogTitle';
import CardDialogDesc from './CardDialogDesc';
import CardDialogDeadline from './CardDialogDeadline';
import CardDialogComments from './CardDialogComments';

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
    <Dialog fullWidth onClose={onClose} {...rest}>
      <CardDialogTitle onClose={onClose} color={color} subtitle={subtitle}>
        {title}
      </CardDialogTitle>
      <CardDialogDesc desc={desc} />
      <CardDialogDeadline date={deadline} />
      <CardDialogComments comments={comments} />
    </Dialog>
  );
};

export default CardDialog;
