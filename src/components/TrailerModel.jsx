/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Modal from 'react-modal';
import '../css/TrailerModal.css';

Modal.setAppElement('#root');

function TrailerModal({ isOpen, onRequestClose, trailerUrl }) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%'
        }
      }}
    >
      <div className="relative h-full">
        <button className="absolute top-2 right-2 text-white" onClick={onRequestClose}>Close</button>
        <iframe
          width="100%"
          height="100%"
          src={trailerUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
}

export default TrailerModal;