import React, { FC } from 'react'
import Toast from 'react-bootstrap/Toast';
import { ToastGenericFC } from '../models/ToastGeneric';
import { ToastContainer } from 'react-bootstrap';

const ToastGeneric: FC<ToastGenericFC> = ({ title, content, type, show }) => {
  return (
    <>
      <ToastContainer
        className="p-3"
        position="bottom-center"
        style={{ zIndex: 1 }}>
        <Toast
          className="d-inline-block m-1"
          bg={type.toLowerCase()}
          delay={3000}
          show={show}
          autohide={true}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body className={(type === 'Dark') ? 'text-white' : ''}>
            {content}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ToastGeneric