import React, { FC } from 'react';
import styles from './CloseButton.module.scss';
interface Props {
  onClose: () => void;
  className?: string;
}

const CloseButton: FC<Props> = ({onClose, className = ''}) => {
  return (
    <button type='button' className={`${styles.closeBtn} ${className}`} onClick={onClose}>

    </button>
  );
};

export default CloseButton;