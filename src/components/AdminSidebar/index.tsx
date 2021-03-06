import React, { useMemo } from 'react';
import { FiAlertCircle, FiMapPin, FiPower } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';

import logo from '../../assets/images/grandma.svg';

import { Container, CustomLink } from './styles';

const AdminSidebar: React.FC = () => {
  const { signOut } = useAuth();

  const fullUrl = useMemo(() => {
    const url = window.location.href.split('/');
    return url[url.length - 1];
  }, []);

  return (
    <Container>
      <img src={logo} alt="Vó Supimpa" />
      <div>
        <CustomLink
          to="/admin/dashboard"
          className={fullUrl === 'dashboard' ? 'active' : ''}
        >
          <FiMapPin size={24} />
          <span>Instituições cadastradas</span>
        </CustomLink>
        <CustomLink
          to="/admin/dashboard/pending"
          className={fullUrl === 'pending' ? 'active' : ''}
        >
          <FiAlertCircle size={24} />
          <span>Instituições pendentes</span>
        </CustomLink>
      </div>
      <button type="button" onClick={signOut}>
        <FiPower size={24} />
        <span>Log out</span>
      </button>
    </Container>
  );
};

export default AdminSidebar;
