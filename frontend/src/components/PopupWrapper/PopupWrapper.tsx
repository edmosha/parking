import React, {
  FC, PropsWithChildren, useEffect, useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './PopupWrapper.module.scss';
import CloseButton from '@/components/CloseButton/CloseButton';
/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

export interface PopupWrapperProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const PopupWrapper: FC<PopupWrapperProps> = (
  {
    children,
    isOpen,
    onClose,
  },
) => {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  useEffect(() => {
    const onEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onEscPress);

    return () => {
      document.removeEventListener('keydown', onEscPress);
    };
  }, [onClose]);


  return createPortal(
    isOpen && (
      <section
        className={styles.popupWrapper}
        style={{ display: isOpen ? 'block' : 'none' }}>

        <div className={styles.popup}>
          <CloseButton onClose={onClose} className={styles.closeBtn}/>
          {children}
        </div>

      </section>
    ),
    document.body,
  );
};

export default PopupWrapper;
