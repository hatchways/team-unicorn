const formProps = {
  style: {
    textField: {
      variant: 'outlined',
      margin: 'dense',
      fullWidth: true,
    },
    textAreaField: {
      // rowsMin: 5,
      // rowsMax: 5,
      rows: 5,
    },
  },
  html: {
    addColumn: {
      title: {
        id: 'title',
        label: 'Add Title *',
        name: 'title',
        type: 'text',
      },
    },
    editColumn: {
      description: {
        id: 'description',
        name: 'description',
        placeholder: 'Type your description here *',
      },
    },
  },
};

export default formProps;
