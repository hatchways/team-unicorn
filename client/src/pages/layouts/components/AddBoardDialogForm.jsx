import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';

import BoardContext from '../../../contexts/board/boardContext';

import formProps from '../../board/components/forms/props';
import formValidation from '../../board/components/forms/validator';

const useStyles = makeStyles(() => ({
  addDialogModal: {
    '& .closeButton': {
      position: 'absolute',
      right: '10px',
      top: '10px',
      color: 'lightblue',
    },
    textAlign: 'center',
    '& .MuiDialog-paper': {
      padding: '35px 20px 25px 20px',
      '& .MuiDialogContent-root': {
        minHeight: '245px',
        '& form': {
          marginTop: '40px',
          '& .MuiFormControl-fullWidth': {
            width: '90%',
          },
          '& button': {
            margin: '45px 0 0 0',
            padding: '5px 30px',
          },
        },
      },
    },
  },
}));

const AddBoardDialogForm = ({open, setOpen}) => {
  const {error, AddBoard} = useContext(BoardContext);
  const classes = useStyles();
  const [success, setSuccess] = useState(false);

  const {register, handleSubmit, errors} = useForm();

  const {title: titleProps} = formProps.html.addBoard;
  const {textField: textFieldProps} = formProps.style;
  const {title: titleValidation} = formValidation.addBoard;

  const onSubmitForm = async (formData) => {
    await AddBoard({name: formData.name});
    if (!error) {
      document.getElementById('name').value = '';
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    }
  };
  const handleClose = () => {
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
          {success && <div>Added Successfully</div>}

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
