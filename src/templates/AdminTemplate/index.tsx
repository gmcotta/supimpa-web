import React from 'react';

import AdminSidebar from '../../components/AdminSidebar';

import { Container, Board } from './styles';

const AdminTemplate: React.FC = ({ children }) => {
  return (
    <Container>
      <AdminSidebar />
      <Board>{children}</Board>
    </Container>
  );
};

export default AdminTemplate;
