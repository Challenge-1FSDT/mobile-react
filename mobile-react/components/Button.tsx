// button component with props

import React from 'react';

interface ButtonProps {
  auto: boolean;
  type: string;
  children: React.ReactNode;
  onClick?: () => void;
}



const Button: React.FC<ButtonProps> = ({ auto, type, children, onClick }) => {
  return (
    <button className={`btn ${type} ${auto ? 'auto' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;