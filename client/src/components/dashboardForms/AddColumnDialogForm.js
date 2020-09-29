import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import dialogStyles from '../styles/DialogStyles';

import addColumnByBoardId from '../../api/Column';
import formProps from '../forms/props';
import formValidation from '../forms/validator';

const AddColumnDialogForm = ({open, setOpen, boardId, setLoadBoard}) => {
  const classes = dialogStyles();
  const {register, handleSubmit, errors} = useForm();

  const [columnData, setColumnData] = useState();
  const [error, setError] = useState(false);

  const {title: titleProps} = formProps.html.addColumn;
  const {textField: textFieldProps} = formProps.style;
  const {title: titleValidation} = formValidation.addColumn;

  const onSubmitForm = async (formData) => {
    const payload = await addColumnByBoardId(boardId, {name: formData.name});

    setError(payload.error);
    setColumnData(payload.data);
    // data.columns.push(payload.data);
    // setData(data);

    if (!error) {
      document.getElementById('name').value = '';
      setLoadBoard(true);
    }
    setTimeout(() => {
      setError(false);
      setColumnData();
      setOpen(false);
    }, 500);
  };
  const handleClose = () => {
    setError(false);
    setColumnData();
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.addColumnDialogModal}
    >
      <DialogContent>
        <IconButton
          aria-label="close"
          className="closeButton"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">Create a new column</Typography>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          noValidate
          autoComplete="off"
          id="addColumnForm"
        >
          {error && <div>Something went wrong. Please try again!!</div>}
          {columnData?.cards.length === 0 ? <div>Added Successfully</div> : ' '}

          <TextField
            {...textFieldProps}
            {...titleProps}
            inputRef={register(titleValidation)}
            {...formValidation.getMuiErrorProps(errors, titleProps.name)}
          />
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddColumnDialogForm;
