import React, { FC } from 'react';
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper';
import style from './ErrorTimePopup.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorTimePopup: FC<Props> = ({isOpen, onClose}) => {
  return (
    <PopupWrapper isOpen={isOpen} onClose={onClose}>

    </PopupWrapper>
  );
};

export default ErrorTimePopup;