import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import grandmaIcon from '../../assets/images/grandma.svg';

import { Container } from './styles';

const Sidebar: React.FC = () => {
  return (
    <Container>
      <img src={grandmaIcon} alt="Vó Supimpa" />
      <Link to="/map">
        <FiArrowLeft size={24} />
      </Link>
    </Container>
  );
};

export default Sidebar;
