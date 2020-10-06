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

import {addBoard} from '../../api/Board';
import formProps from '../forms/props';
import formValidation from '../forms/validator';

const AddBoardDialogForm = ({open, setOpen, setBoards}) => {
  const classes = dialogStyles();
  const {register, handleSubmit, errors} = useForm();

  const [boardData, setBoardData] = useState();
  const [error, setError] = useState(false);

  const {title: titleProps} = formProps.html.addBoard;
  const {textField: textFieldProps} = formProps.style;
  const {title: titleValidation} = formValidation.addBoard;

  const onSubmitForm = async (formData) => {
    const payload = await addBoard({name: formData.name});

    setError(payload.error);
    setBoardData(payload.data);

    if (!error) {
      document.getElementById('name').value = '';
      setBoards((prevState) => {
        return [...prevState, payload.data];
      });
    }
    setTimeout(() => {
      setError(false);
      setBoardData();
      setOpen(false);
    }, 500);
  };
  const handleClose = () => {
    setError(false);
    setBoardData();
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.addDialogModal}
    >
      <DialogContent>
        <IconButton
          aria-label="close"
          className="closeButton"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">Create new board</Typography>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          noValidate
          autoComplete="off"
          id="addBoardForm"
        >
          {error && <div>Something went wrong. Please try again!!</div>}
          {boardData?.columns.length === 2 ? (
            <div>Added Successfully</div>
          ) : (
            ' '
          )}

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
export default AddBoardDialogForm;
