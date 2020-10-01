import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  dashboardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginTop: ' 40px',
  },
  addColumnContainer: {
    width: '5%',
    '&#leftNav': {
      '& .addColumnContent': {
        minHeight: '500px',
        '& a': {
          width: '2%',
          padding: '0 30px 0 0',
          left: '-30px',
          minHeight: '500px',
          position: 'fixed',
          textDecoration: 'none',
          height: 'inherit',
          display: 'flex',
          alignItems: 'center',
          '& button': {
            marginRight: '10px',
            backgroundColor: theme.palette.props.slideFont,
            padding: '0px',
            color: theme.palette.props.slideBackground,
          },
          '&:hover': {
            padding: '0 0 0 20px',
            left: 0,
            position: 'relative',
            width: 'fit-content',
            backgroundColor: theme.palette.props.slideBackground,
            transition: '0.05s',
          },
        },
      },
    },
    '&#rightNav': {
      display: 'flex',
      justifyContent: 'flex-end',
      '& .addColumnContent': {
        minHeight: '500px',
        '& a': {
          position: 'fixed',
          transition: '0.1s',
          textDecoration: 'none',
          height: 'inherit',
          display: 'flex',
          alignItems: 'center',
          width: '2%',
          padding: '0 0 0 30px',
          right: '-30px',
          minHeight: '500px',
          '& button': {
            marginLeft: '10px',
            backgroundColor: theme.palette.props.slideFont,
            color: theme.palette.props.slideBackground,
            padding: '0px',
          },
          '&:hover': {
            position: 'relative',
            width: 'fit-content',
            backgroundColor: theme.palette.props.slideBackground,
            right: 0,
            padding: '0 10px 0 0',
          },
        },
      },
    },
  },
  columnsContainer: {
    width: '90%',
    '& .addCard': {
      backgroundColor: 'lightblue',
      display: 'block',
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
      },
      margin: '8px 0',
      padding: theme.spacing(1),
      textTransform: 'none',
      alignContent: 'center',
    },
    '& .columns': {
      display: 'flex',
      overflowX: 'scroll',
      width: '100%',
      height: '450px',
      '& > *': {
        margin: theme.spacing(1),
      },
      '& .column': {
        display: 'flex',
        flexWrap: 'wrap',
        height: 'fit-content',
        minWidth: '175px',
        padding: theme.spacing(2),
        background: theme.palette.background.default,
        '& .cardItem': {
          cursor: 'pointer',
          marginBottom: theme.spacing(2),
          width: '150px',
        },
      },
      '& .title': {
        marginBottom: theme.spacing(2),
      },
    },
  },
}));
