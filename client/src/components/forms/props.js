const formProps = {
  style: {
    textField: {
      variant: 'outlined',
      margin: 'dense',
      fullWidth: true,
    },
    textAreaField: {
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
    editCard: {
      description: {
        id: 'desc',
        name: 'desc',
        placeholder: 'Type your description here',
      },
    },
  },
};

export default formProps;
