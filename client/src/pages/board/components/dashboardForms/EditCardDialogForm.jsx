import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
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

const EditCardDialogForm = ({open, setOpen, detailCardData}) => {
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

      setTimeout(() => {
        setUpdatedError(false);
        setUpdatedData();
        setOpen(false);
      }, 500);
    }
  };

  const handleClose = () => {
    setUpdatedError(false);
    setUpdatedData();
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
      // className={classes.editCardDialogModal}
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
