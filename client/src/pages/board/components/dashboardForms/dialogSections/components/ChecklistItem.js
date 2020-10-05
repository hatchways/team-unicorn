import React from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/HighlightOffRounded';
import TextFieldOnFocusTypography from './TextFieldOnFocusTypography';

// TODO: make it draggable to reorder?
const ChecklistItem = ({
  text,
  timestamp,
  disabled,
  checked,
  handleToggle,
  handleTextChange,
  handleDelete,
  ...other
}) => {
  const onToggle = () => handleToggle(timestamp, !checked);
  const saveText = (value) => handleTextChange(timestamp, value);
  const onDelete = () => handleDelete(timestamp);

  // NOTE: Consider using useMemo here?
  const TextFieldProps = {
    id: `card-check-item-text-${timestamp}`,
    name: `card-check-item-text-${timestamp}`,
    autoComplete: 'off',
    rows: 1,
    rowsMax: 6,
    fullWidth: true,
  };
  return (
    <ListItem alignItems="center" disableGutters>
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={onToggle}
        {...other}
      />
      <TextFieldOnFocusTypography
        TextFieldProps={TextFieldProps}
        text={text}
        saveText={saveText}
        placeholder="Enter checklist item..."
        disabled={disabled}
      />
      <ListItemSecondaryAction>
        <IconButton
          disabled={disabled}
          onClick={onDelete}
          size="small"
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default ChecklistItem;
