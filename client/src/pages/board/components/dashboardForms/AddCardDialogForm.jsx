import React, {useState, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import {BoardContext} from 'contexts/boardContext';
import {addCardByColumnId} from '../../../../api/Card';
import formProps from '../forms/props';
import formValidation from '../forms/validator';

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

const AddCardDialogForm = ({open, setOpen, columnId}) => {
  const classes = useStyles();

  // const classes = dialogStyles();
  const {register, handleSubmit, errors} = useForm();

  const [cardData, setCardData] = useState();
  const [error, setError] = useState(false);

  const {title: titleProps} = formProps.html.addCard;
  const {textField: textFieldProps} = formProps.style;
  const {title: titleValidation} = formValidation.addCard;

  const {dispatch} = useContext(BoardContext);

  const onSubmitForm = async (formData) => {
    const payload = await addCardByColumnId(columnId, {name: formData.name});

    dispatch({
      type: 'ADD_CARD',
      columnId,
      task: payload.data,
    });

    setError(payload.error);
    setCardData(payload.data);

    if (!error) {
      document.getElementById('name').value = '';
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
        <Typography variant="h3">Create a new card</Typography>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          noValidate
          autoComplete="off"
          id="addCardForm"
        >
          {error && <div>Something went wrong. Please try again!!</div>}
          {cardData?.name ? <div>Added Successfully</div> : ' '}

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
export default AddCardDialogForm;
