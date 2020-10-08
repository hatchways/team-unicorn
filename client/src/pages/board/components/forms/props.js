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
        id: 'name',
        label: 'Add Title *',
        name: 'name',
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
    addCard: {
      title: {
        id: 'name',
        label: 'Add Title *',
        name: 'name',
        type: 'text',
      },
    },
  },
};

export default formProps;
