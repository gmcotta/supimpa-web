import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const HomePage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  return (
    <div>
      <h1>Home Page</h1>
      <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false}>
        <h1>Modal</h1>
      </Modal>
    </div>
  );
};

export default HomePage;
