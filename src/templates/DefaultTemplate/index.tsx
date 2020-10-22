import React from 'react';
import Sidebar from '../../components/Sidebar';

import { Container, Card } from './styles';

type SidebarProps = {
  backButtonUrl: string;
};

const DefaultTemplate: React.FC<SidebarProps> = ({
  backButtonUrl,
  children,
}) => {
  return (
    <Container>
      <Sidebar backButtonUrl={backButtonUrl} />
      <Card>{children}</Card>
    </Container>
  );
};

export default DefaultTemplate;
