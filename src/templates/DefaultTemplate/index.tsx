import React from 'react';
import Sidebar from '../../components/Sidebar';

import { Container, Card } from './styles';

const DefaultTemplate: React.FC = ({ children }) => {
  return (
    <Container>
      <Sidebar />
      <Card>{children}</Card>
    </Container>
  );
};

export default DefaultTemplate;
