const mockData = {
  tasks: {
    'task-1': {id: 'task-1', content: 'Essay on the environment'},
    'task-2': {id: 'task-2', content: 'Midterm exam', date: 'March 10'},
    'task-3': {id: 'task-3', content: 'Review practice exam'},
    'task-4': {id: 'task-4', content: 'Homework'},
    'task-5': {id: 'task-5', content: 'Workshop'},
    'task-6': {id: 'task-6', content: 'Practice exam'},
    'task-7': {id: 'task-7', content: 'Research'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Philosophy',
      taskIds: ['task-1'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Math',
      taskIds: ['task-2', 'task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'In Progress',
      taskIds: ['task-4'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Completed',
      taskIds: ['task-5', 'task-6', 'task-7'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default mockData;
