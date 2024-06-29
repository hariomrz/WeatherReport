// Shimmer.jsx
import React from 'react';
import '../App.css';

const Shimmer = () => {
  return (
    <div className="gradient-background">
      <div className="container">
        <div className="shimmer-wrapper shimmer-text"></div>
        <div className="description">
          <div className="shimmer-wrapper shimmer-img"></div>
          <div className="shimmer-wrapper shimmer-text"></div>
        </div>
        <div className="temp">
          <div className="shimmer-wrapper shimmer-temp"></div>
        </div>
      </div>
      <div className="footer">
        <div className="shimmer-wrapper shimmer-footer-item"></div>
        <div className="shimmer-wrapper shimmer-footer-item"></div>
        <div className="shimmer-wrapper shimmer-footer-item"></div>
      </div>
    </div>
  );
};

export default Shimmer;
