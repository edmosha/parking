import React, { FC } from 'react';
import styles from './Button.module.scss';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  buttonStyle?: 'border' | 'fill';
  className?: string;
  onClick: () => void;
}

const Button: FC<Props> = (
  {buttonStyle = 'fill', className = '', onClick, children}
) => {
  return (
    <button
      className={`${buttonStyle === 'fill' ? styles.fill : styles.border} ${styles.button} ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;