import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

import Modal from 'react-modal';

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 14px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

function DocumentModal({isModalOpen, closeModal}) {

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                maxWidth: "500px",
                margin: "auto",
                padding: "20px",
                borderRadius: "10px",
              },
            }}
        >
            <h2>Document Details</h2>
            <CloseButton onClick={closeModal}>Close</CloseButton>
        </Modal>
    );
}

export default DocumentModal;