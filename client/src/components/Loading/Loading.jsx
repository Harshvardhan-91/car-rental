// src/components/Loading/Loading.jsx
import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-balls">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading;