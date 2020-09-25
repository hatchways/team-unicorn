import React, {useState} from 'react';
import {Grid, Box, makeStyles} from '@material-ui/core';
import _ from 'lodash';
import AddColumn from './AddColumn';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'content-box',
    marginTop: theme.spacing(theme.contentIndent),
    marginBottom: theme.spacing(theme.contentIndent),
  },
  board: {
    marginLeft: theme.spacing(theme.contentIndent),
    marginRight: theme.spacing(theme.contentIndent),
  },
}));

const useHover = () => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const isMouseInBounds = (x, width) => {
    const pct = width / 10;
    const leftThreshold = pct;
    const rightThreshold = width - pct;

    if (x <= leftThreshold) {
      setShowLeft(true);
      setShowRight(false);
    } else if (x >= rightThreshold) {
      setShowLeft(false);
      setShowRight(true);
    } else {
      setShowLeft(false);
      setShowRight(false);
    }
  };

  const debounced = _.debounce(isMouseInBounds, 30, {maxWait: 100});

  const handleMouseMove = (e) => {
    e.persist();
    debounced(e.clientX, e.currentTarget.offsetWidth);
  };

  return {
    showLeft,
    showRight,
    handleMouseMove,
  };
};

const BoardContainer = ({children}) => {
  const classes = useStyles();
  const {showLeft, showRight, handleMouseMove} = useHover();

  return (
    <Grid
      direction="row"
      className={classes.root}
      alignItems="stretch"
      container
      onMouseMove={handleMouseMove}
    >
      {showLeft && (
        <Grid item xs={1}>
          <AddColumn show={showLeft} />
        </Grid>
      )}
      <Grid
        item
        xs
        className={classes.board}
        style={{backgroundColor: 'lightcyan'}}
      >
        {children}
      </Grid>
      {showRight && (
        <Grid component={Box} borderRadius="borderRadius" item xs={1}>
          <AddColumn show={showRight} />
        </Grid>
      )}
    </Grid>
  );
};

export default BoardContainer;
