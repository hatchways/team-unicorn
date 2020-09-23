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

import {addColumn} from '../../actions/column';
import formProps from '../forms/props';
import formValidation from '../forms/validator';

const AddColumnDialogForm = (props) => {
  const {open, newColumn, setNewColumn} = props;

  const classes = dialogStyles();
  const {register, handleSubmit, errors} = useForm();

  const [data, setData] = useState();
  const [error, setError] = useState(false);

  const {title: titleProps} = formProps.html.addColumn;
  const {textField: textFieldProps} = formProps.style;
  const {title: titleValidation} = formValidation.addColumn;

  const onSubmitForm = async (formData) => {
    const payload = await addColumn(formData.title);

    setError(payload.error);
    setData(payload.data);
    const {columns} = newColumn;
    columns.push(payload.data);
    setNewColumn({columns});

    if (!error) document.getElementById('title').value = '';
    setTimeout(() => {
      setError(false);
      setData();
    }, 4000);
  };
  const handleClose = () => {
    setError(false);
    setData(false);
    props.setOpen(false);
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
          {data?.cards.length === 0 ? <div>Added Successfully</div> : ' '}

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
