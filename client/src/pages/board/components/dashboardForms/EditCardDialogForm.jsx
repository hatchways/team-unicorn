import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Divider,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';

import formProps from '../forms/props';

import {updateCard} from '../../../../api/Card';

const useStyles = makeStyles(() => ({
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
const EditCardDialogForm = ({open, setOpen, detailCardData}) => {
  const classes = useStyles();
  const {register, handleSubmit} = useForm();

  const [updatedData, setUpdatedData] = useState();
  const [updatedError, setUpdatedError] = useState(false);

  const {description: descriptionProps} = formProps.html.editCard;
  const {textAreaField: textAreaFieldProps} = formProps.style;

  const onSubmitForm = async (formData) => {
    if (formData.desc !== detailCardData.desc) {
      const submitData = detailCardData;
      submitData.desc = formData.desc;

      const payload = await updateCard(submitData);
      setUpdatedError(payload.error);
      setUpdatedData(payload.data);

      if (!payload.error) {
        setTimeout(() => {
          setOpen(false);
        }, 500);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditCancel = () => {
    document.getElementById('desc').value =
      detailCardData.desc !== undefined ? detailCardData.desc : '';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.editCardDialogModal}
    >
      <DialogContent>
        {detailCardData?.column ? (
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
                <Typography variant="subtitle1">
                  {detailCardData.name}
                </Typography>
                <Typography variant="body1" className="cardSubTitle">
                  in list {detailCardData.column.name}
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
                {updatedError && (
                  <div>Something went wrong. Please try again!!</div>
                )}
                {updatedData ? <div>Edited Successfully</div> : ' '}
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
                    <textarea
                      {...textAreaFieldProps}
                      {...descriptionProps}
                      ref={register}
                      defaultValue={detailCardData.desc}
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
export default EditCardDialogForm;
