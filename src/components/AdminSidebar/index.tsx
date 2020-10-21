import React from 'react';
import { FiAlertCircle, FiMapPin } from 'react-icons/fi';
import { CgLogOff } from 'react-icons/cg';

import { useAuth } from '../../context/AuthContext';

import logo from '../../assets/images/grandma.svg';

import { Container, CustomLink } from './styles';

const AdminSidebar: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <img src={logo} alt="Vó Supimpa" />
      <div>
        <CustomLink to="/dashboard">
          <FiMapPin size={24} />
          <span>Instituições cadastradas</span>
        </CustomLink>
        <CustomLink to="/dashboard">
          <FiAlertCircle size={24} />
          <span>Instituições pendentes</span>
        </CustomLink>
      </div>
      <button type="button" onClick={signOut}>
        <CgLogOff size={24} />
        <span>Log out</span>
      </button>
    </Container>
  );
};

export default AdminSidebar;
