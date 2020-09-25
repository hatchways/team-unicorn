import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
// import dialogStyles from '../styles/DialogStyles';

import { addCardByColumnId } from '../../../../api/Card.js';
import formProps from '../forms/props';
import formValidation from '../forms/validator';

const AddCardDialogForm = (props) => {
  const { open, columnId, setUpdate } = props;

  // const classes = dialogStyles();
  const { register, handleSubmit, errors } = useForm();

  const [cardData, setCardData] = useState();
  const [error, setError] = useState(false);

  const { title: titleProps } = formProps.html.addCard;
  const { textField: textFieldProps } = formProps.style;
  const { title: titleValidation } = formValidation.addCard;

  const onSubmitForm = async (formData) => {
    const payload = await addCardByColumnId(columnId, { name: formData.name });
    await setUpdate(true)
    setError(payload.error);
    setCardData(payload.data);

    if (!error) {
      document.getElementById('name').value = '';
    }
    setTimeout(() => {
      setError(false);
      setCardData();
      props.setOpen(false);
    }, 1000);
  };
  const handleClose = () => {
    setError(false);
    setCardData();
    props.setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          id="addColumnForm"
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
