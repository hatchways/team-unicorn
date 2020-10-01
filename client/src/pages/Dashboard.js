import React, {useEffect, useState} from 'react';
import AppLayout from './layouts/AppLayout';
import DashboardActions from '../components/dashboard/DashboardActions';
import CalendarActions from '../components/calendar/CalendarActions';
import {getBoards} from '../api/Board';

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

  return (
    <>
      {error && <>Something went wrong. Please try again!!!</>}
      {loading && <>Loading ...</>}
      {boards?.length > 0 ? (
        <AppLayout
          boards={boards}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          setCurrentView={setCurrentView}
        >
          {currentView === 'dashboard' ? (
            <DashboardActions currentBoard={currentBoard} />
          ) : (
            <CalendarActions currentBoard={currentBoard} />
          )}
        </AppLayout>
      ) : (
        ''
      )}
    </>
  );
};

export default Dashboard;
