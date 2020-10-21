import React from 'react';

import AdminSidebar from '../../../components/AdminSidebar';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <AdminSidebar />
      <main>
        <h1>Dashboard</h1>
      </main>
    </Container>
  );
};

export default Dashboard;
