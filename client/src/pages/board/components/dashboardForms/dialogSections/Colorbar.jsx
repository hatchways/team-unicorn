import React, {useState, useRef, useEffect} from 'react';
import {makeStyles, Box, Popover} from '@material-ui/core';
import {CardColorsFactory} from './enums';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '1.5rem',
    width: '35px',
    marginLeft: theme.spacing(0.5),
    borderWidth: '4px',
    backgroundColor: ({color}) => color || theme.palette.primary.main,
    borderColor: ({color}) => color || theme.palette.primary.main,
    borderStyle: 'solid',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  colorButton: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Colorbar = ({
  color,
  shade = 500,
  onColorChange,
  havePopOver,
  ...other
}) => {
  const classes = useStyles({color});

  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  const colorOptions = CardColorsFactory(shade);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    anchorEl.current = document.getElementById('colorbar');
  }, [anchorEl]);

  const closeAndSave = (newColor) => {
    setOpen(false);
    onColorChange(newColor);
  };
  return (
    <>
      <Box
        id="colorbar"
        component="span"
        className={classes.root}
        onClick={handleOpen}
        {...other}
      />
      {havePopOver && (
        <Popover
          open={open}
          anchorEl={anchorEl.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-evenly">
            {Object.keys(colorOptions).map((colorCode) => (
              <Box
                key={colorCode}
                component="span"
                className={classes.colorButton}
                bgcolor={colorOptions[colorCode]}
                borderColor={colorOptions[colorCode]}
                borderRadius={10}
                border={5}
                width={10}
                height={10}
                margin={1}
                onClick={() => closeAndSave(colorOptions[colorCode])}
              />
            ))}
          </Box>
        </Popover>
      )}
    </>
  );
};

export default Colorbar;
