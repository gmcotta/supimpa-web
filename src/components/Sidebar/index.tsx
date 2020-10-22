import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import grandmaIcon from '../../assets/images/grandma.svg';

import { Container } from './styles';

type SidebarProps = {
  backButtonUrl: string;
};

const Sidebar: React.FC<SidebarProps> = ({ backButtonUrl }) => {
  return (
    <Container>
      <img src={grandmaIcon} alt="Vó Supimpa" />
      <Link to={backButtonUrl}>
        <FiArrowLeft size={24} />
      </Link>
    </Container>
  );
};

export default Sidebar;
