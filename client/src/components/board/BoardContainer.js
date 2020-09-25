import React, {useState, useCallback} from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import AddColumn from './AddColumn';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

const useHover = () => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const handleShow = (e, cb) => {
    e.stopPropagation();
    cb(true);
  };
  const handleHide = (e, cb) => {
    e.stopPropagation();
    cb(false);
  };

  const handleShowLeft = useCallback(
    (e) => {
      handleShow(e, setShowLeft);
    },
    [setShowLeft],
  );
  const handleShowRight = useCallback(
    (e) => {
      handleShow(e, setShowRight);
    },
    [setShowRight],
  );
  const handleHideLeft = useCallback(
    (e) => {
      handleHide(e, setShowLeft);
    },
    [setShowLeft],
  );
  const handleHideRight = useCallback(
    (e) => {
      handleHide(e, setShowRight);
    },
    [setShowRight],
  );

  return {
    showLeft,
    showRight,
    handleShowLeft,
    handleHideLeft,
    handleShowRight,
    handleHideRight,
  };
};

const BoardContainer = ({children}) => {
  const classes = useStyles();
  const {
    showLeft,
    showRight,
    handleShowLeft,
    handleHideLeft,
    handleShowRight,
    handleHideRight,
  } = useHover();
  return (
    <Grid
      direction="row"
      className={classes.root}
      alignItems="stretch"
      container
    >
      <Grid
        item
        xs={1}
        onMouseEnter={handleShowLeft}
        onMouseLeave={handleHideLeft}
      >
        <AddColumn show={showLeft} />
      </Grid>
      <Grid item xs style={{backgroundColor: 'lightcyan'}}>
        {children}
      </Grid>
      <Grid
        item
        xs={1}
        onMouseEnter={handleShowRight}
        onMouseLeave={handleHideRight}
      >
        <AddColumn show={showRight} />
      </Grid>
    </Grid>
  );
};

export default BoardContainer;
