import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  addDialogModal: {
    '& .closeButton': {
      position: 'absolute',
      right: '10px',
      top: '10px',
      color: theme.palette.props.dialogClose,
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
      color: theme.palette.props.dialogClose,
    },
    '& .MuiDivider-root': {margin: '20px 0'},
    '& .MuiDialog-paper': {
      width: '90%',
      '& .MuiDialogContent-root': {
        minHeight: '245px',
        padding: '20px 0 40px 0',
        '& .cardSubTitle': {
          color: theme.palette.props.cardSubTitle,
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
              color: theme.palette.primary.main,
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
            borderColor: theme.palette.props.textAreaBorder,
            outlineColor: theme.palette.primary.main,
            padding: '10px',
            borderRadius: '5px',
            resize: 'none',
          },
          '& .editCancel': {
            padding: 0,
            marginLeft: '10px',
            color: theme.palette.primary.main,
            '& .MuiSvgIcon-root': {
              fontSize: '1.2rem',
            },
          },
        },
      },
    },
  },
}));
