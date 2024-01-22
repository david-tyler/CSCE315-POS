import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have the necessary permissions to access this page.</p>
      <button onClick={() => navigate('/')}>Return to home page</button>
    </div>
  );
};