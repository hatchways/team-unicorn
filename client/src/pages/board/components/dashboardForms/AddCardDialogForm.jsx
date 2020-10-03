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

import {addCardByColumnId} from '../../../../api/Card';
import formProps from '../forms/props';
import formValidation from '../forms/validator';

// yeah will need to make absolute paths soon
import {BoardContext} from '../../../../contexts/boardContext';

const useStyles = makeStyles(() => ({
  addCardDialogModal: {
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
  editCardDialogModal: {
    '& .closeButton': {
      position: 'absolute',
      right: '10px',
      top: '10px',
      color: 'lightblue',
    },
    '& .MuiDivider-root': {margin: '20px 0'},
    '& .MuiDialog-paper': {
      width: '90%',
      '& .MuiDialogContent-root': {
        minHeight: '245px',
        padding: '20px 0 40px 0',
        '& .cardSubTitle': {
          color: 'grey',
        },
        '& .submitSummary': {
          margin: '20px',
        },
        '& .editCardSection': {
          display: 'flex',
          margin: '0 20px',
          '& .buttonFields': {
            marginTop: '15px',
          },
          '& button': {
            '&.icon': {
              padding: '0 9px 0 0',
              color: 'lightblue',
            },
          },
          '& .rightContent': {
            width: '90%',
          },
          '& .button': {
            padding: '5px 30px',
          },
          '& textarea': {
            width: '90%',
            minWidth: '90%',
            marginTop: '10px',
            borderColor: 'red',
            outlineColor: 'blue',
            padding: '10px',
            borderRadius: '5px',
            resize: 'none',
          },
          '& .editCancel': {
            padding: 0,
            marginLeft: '10px',
            color: 'red',
            '& .MuiSvgIcon-root': {
              fontSize: '1.2rem',
            },
          },
        },
      },
    },
  },
}));

const AddCardDialogForm = (props) => {
  const classes = useStyles();
  const {open, columnId} = props;

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
    }
    setTimeout(() => {
      setError(false);
      setCardData();
      // props.setUpdate(true)
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
      className={classes.addCardDialogModal}
    >
      <DialogContent>
        <IconButton
          aria-label="close"
          className="closeButton"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4">Create a new card</Typography>

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
