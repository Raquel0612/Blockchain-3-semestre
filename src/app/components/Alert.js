// components/Alert.js
import React from 'react';

export default function Alert({ type = 'info', message, onClose }) {
  const colors = {
    success: '#4caf50',
    error: '#f44336',
    info: '#2196f3',
    warning: '#ff9800',
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: colors[type] || colors.info,
      color: 'white',
      padding: '15px 25px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '250px',
      fontWeight: 'bold',
    }}>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '16px',
          lineHeight: '16px',
        }}
      >
        ×
      </button>
    </div>
  );
}
