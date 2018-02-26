import React from 'react';
import PropTypes from 'prop-types';

const LeftArrowIcon = ({ width = 16, height = 11, color = '#1785fb' }) => {
  return (
    <svg width={width} height={height} fill={color} viewBox="0 0 16 11">
      <path d="M5.85355339,0.856917295 C6.04881554,0.660885609 6.04881554,0.34305545 5.85355339,0.147023764 C5.65829124,-0.0490079214 5.34170876,-0.0490079214 5.14644661,0.147023764 L0.146446609,5.16672906 C0.0488155365,5.2647449 0,5.39321036 0,5.52167582 C6.9388939e-18,5.65014128 0.0488155365,5.77860674 0.146446609,5.87662259 L5.10326515,10.8529762 C5.29852729,11.0490079 5.61510978,11.0490079 5.81037193,10.8529762 C6.00563407,10.6569446 6.00563407,10.3391144 5.81037193,10.1430827 L1.70710678,6.02364635 L15.4642857,6.02364635 C15.7601525,6.02364635 16,5.79890649 16,5.52167582 C16,5.24444515 15.7601525,5.01970529 15.4642857,5.01970529 L1.70710678,5.01970529 L5.85355339,0.856917295 Z" />
    </svg>
  );
};

LeftArrowIcon.propTypes = {
  height: PropTypes.oneOf([11, 22, 33]),
  width: PropTypes.oneOf([16, 32, 48]),
  color: PropTypes.string
};

export default LeftArrowIcon;
