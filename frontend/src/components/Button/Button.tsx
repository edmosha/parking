import React, { FC } from 'react';
import styles from './Button.module.scss';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  buttonStyle?: 'border' | 'fill';
  className?: string;
}

const Button: FC<Props> = ({buttonStyle = 'fill', className = '', children}) => {
  return (
    <button className={`${buttonStyle === 'fill' ? styles.fill : styles.border} ${styles.button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;