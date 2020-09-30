import React, {useState, useCallback, useEffect} from 'react';

/**
 * @description
 * A Component to Switch between a typography
 * and a text field component.
 *
 */

const TextFieldOnFocusTypography = ({
  TextFieldComponent,
  TypographyComponent,
  text,
  saveText,
  focusAreaRef,
  cooldown = 200,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    const newText = e.target.value;
    saveText(newText);
    setIsEditing(false);
  };

  useEffect(() => {
    const ref = focusAreaRef;
    let timeout;
    if (!isEditing && ref) {
      timeout = setTimeout(
        () => ref.current.addEventListener('click', handleFocus),
        cooldown,
      );
    }
    return () => {
      clearTimeout(timeout);
      if (ref?.current) {
        ref.current.removeEventListener('click', handleFocus);
      }
    };
  }, [isEditing, focusAreaRef, cooldown]);

  const setRefFocus = useCallback(
    (node) => {
      if (node !== null) {
        focusAreaRef.current.removeEventListener('click', handleFocus);
        node.focus();
      }
    },
    [focusAreaRef],
  );

  return isEditing ? (
    <TextFieldComponent
      inputRef={setRefFocus}
      defaultValue={text}
      onBlur={handleBlur}
    />
  ) : (
    <TypographyComponent>{text}</TypographyComponent>
  );
};

export default TextFieldOnFocusTypography;
