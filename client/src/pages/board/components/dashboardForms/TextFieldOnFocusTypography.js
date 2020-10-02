import React, {useState, useCallback} from 'react';
import {makeStyles, TextField, Typography, Box} from '@material-ui/core';

// TODO: Documentation
// TODO: Needs to be tested more throughly
// TODO: Consider UX implications (e.g. no
//       undo once component is blurred)

/**
 * @description
 * A Component to Switch between a typography
 * and a text field component.
 *
 */

const useStyles = makeStyles((theme) => ({
  inputMultiline: {
    lineHeight: '1.1em',
    padding: theme.spacing(2),
  },
  typography: {
    padding: theme.spacing(2),
    lineHeight: '1.1em',
    borderRadius: theme.shape.borderRadius,
    minHeight: theme.typography.body1.lineHeight * 4,
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: ({locked}) => (locked ? null : theme.palette.grey[300]),
      cursor: ({locked}) => (locked ? null : 'pointer'),
    },
  },
}));

const TextFieldOnFocusTypography = ({
  TextFieldProps,
  TypographyProps,
  text,
  saveText,
  placeholder,
  locked,
}) => {
  const classes = useStyles({locked});
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    const newText = e.target.value;
    saveText(newText);
    setFocused(false);
  };

  const setRefFocus = useCallback((node) => {
    if (node !== null) {
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }, []);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      {focused ? (
        <TextField
          inputRef={setRefFocus}
          defaultValue={text}
          onBlur={handleBlur}
          InputProps={{
            root: {},
            classes: {
              multiline: classes.inputMultiline,
            },
          }}
          margin="none"
          multiline
          variant="outlined"
          placeholder={placeholder}
          {...TextFieldProps}
        />
      ) : (
        <Typography
          variant="body1"
          className={classes.typography}
          onClick={locked ? null : handleFocus}
          {...TypographyProps}
        >
          {text || placeholder}
        </Typography>
      )}
    </Box>
  );
};

export default TextFieldOnFocusTypography;
