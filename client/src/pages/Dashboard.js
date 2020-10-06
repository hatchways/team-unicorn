import React, {useEffect, useState} from 'react';
import AppLayout from './layouts/AppLayout';
// import DashboardActions from '../components/dashboard/DashboardActions';
import CalendarActions from '../components/calendar/CalendarActions';
import {getBoards} from '../api/Board';
import KanbanBoard from './board/KanbanBoard';
import {BoardProvider} from '../contexts/boardContext';

const Dashboard = () => {
  // TODO: Wrap dashboard component with AppLayout.
  const [boards, setBoards] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentBoard, setCurrentBoard] = useState();
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    async function fetchData() {
      const payload = await getBoards();
      setBoards(payload.data);
      setLoading(payload.loading);
      setError(payload.error);

      setCurrentBoard(payload.data[0]);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (boards) setCurrentBoard(boards[boards.length - 1]);
  }, [boards]);

  return (
    <>
      {error && <>Something went wrong. Please try again!!!</>}
      {loading && <>Loading ...</>}
      {boards?.length > 0 ? (
        <AppLayout
          boards={boards}
          setBoards={setBoards}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          setCurrentView={setCurrentView}
        >
          <BoardProvider>
            {currentView === 'dashboard' ? (
              <KanbanBoard />
            ) : (
              <CalendarActions currentBoard={currentBoard} />
            )}
          </BoardProvider>
        </AppLayout>
      ) : (
        ''
      )}
    </>
  );
};

export default Dashboard;
