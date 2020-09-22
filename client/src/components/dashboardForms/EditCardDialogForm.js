import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  // TextareaAutosize,
  Divider,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import dialogStyles from '../styles/DialogStyles';

import formProps from '../forms/props';
import formValidation from '../forms/validator';

import {updateCard} from '../../actions/card';

const AddColumnDialogForm = (props) => {
  const {open} = props;

  const {cardData} = props;
  const classes = dialogStyles();
  const {register, handleSubmit, errors} = useForm();

  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  const {title: titleProps} = formProps.html.addColumn;
  const {textField: textFieldProps} = formProps.style;
  const {title: titleValidation} = formValidation.addColumn;

  const onSubmitForm = async (formData) => {
    if (formData.title !== cardData.desc) {
      cardData.desc = formData.title;
      const payload = await updateCard(cardData);

      setError(payload.error);
      setData(payload.data);

      setTimeout(() => {
        setError(false);
        setData(false);
      }, 5000);
    }
  };

  const handleClose = () => {
    setError(false);
    setData();
    props.setCardLoading(true);
    props.setOpen(false);
  };
  const handleEditCancel = () => {
    document.getElementById('title').value = cardData.desc;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.editCardDialogModal}
    >
      <DialogContent>
        {cardData?.column ? (
          <div>
            <IconButton
              aria-label="close"
              className="closeButton"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <div className="editCardSection">
              <div>
                <IconButton
                  aria-label="notepad"
                  disableRipple
                  disableFocusRipple
                  className="icon"
                >
                  <AssignmentOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <Typography variant="subtitle1">{cardData.name}</Typography>
                <Typography variant="body1" className="cardSubTitle">
                  in list {cardData.column.name}
                </Typography>
              </div>
            </div>
            <Divider />

            <form
              onSubmit={handleSubmit(onSubmitForm)}
              noValidate
              autoComplete="off"
              id="editCardForm"
            >
              <div className="submitSummary">
                {error && <div>Something went wrong. Please try again!!</div>}
                {data ? <div>Edited Successfully</div> : ' '}
              </div>
              <div className="editCardSection">
                <div>
                  <IconButton
                    aria-label="notepad"
                    disableRipple
                    disableFocusRipple
                    className="icon"
                  >
                    <ImportContactsTwoToneIcon />
                  </IconButton>
                </div>
                <div className="rightContent">
                  <Typography variant="subtitle1">Description</Typography>
                  <div>
                    {/* <TextareaAutosize
                  {...textAreaProps}
                  {...descriptionProps}
                  inputRef={register(descriptionValidation)}
                  {...formValidation.getMuiErrorProps(
                    errors,
                    descriptionProps.name,
                  )}
                /> */}
                    <TextField
                      {...textFieldProps}
                      {...titleProps}
                      inputRef={register(titleValidation)}
                      {...formValidation.getMuiErrorProps(
                        errors,
                        titleProps.name,
                      )}
                      defaultValue={cardData.desc}
                    />
                  </div>
                  <div className="buttonFields">
                    {' '}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="button"
                    >
                      Save
                    </Button>
                    <IconButton
                      aria-label="cancel"
                      className="editCancel"
                      disableRipple
                      disableFocusRipple
                      onClick={handleEditCancel}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="editCardSection">
            Something went wrong. Please try again!!
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default AddColumnDialogForm;
