import React, { FC } from 'react';
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper';
import styles from './OkPopup.module.scss';
import Tag from '@/components/SideBar/components/Tag/Tag';
import Button from '@/components/Button/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const OkPopup: FC<Props> = ({isOpen, onClose}) => {
  return (
    <PopupWrapper isOpen={isOpen} onClose={onClose}>
      <Tag text='129p/ч'/>
      <h1 className={styles.title}>Вы успешно забронировали место!</h1>
      <p className={styles.placeText}>Адрес: Луначарского ул. 27А</p>

      <div className={styles.timeContainer}>
        <div className={styles.timeBlock}>
          <p className={styles.timeDate}>Cегодня</p>
          <p className={styles.time}>c 12:00</p>
        </div>

        <div className={styles.timeBlock}>
          <p className={styles.timeDate}>Cегодня</p>
          <p className={styles.time}>до 14:00</p>
        </div>
      </div>

      <p className={styles.yourChoose}>Вы выбрали место №{4}</p>

      <Button onClick={() => {}} className={styles.payBtn}>Оплатить сейчас</Button>
      <Button onClick={onClose} buttonStyle='border'>Оплатить потом</Button>
    </PopupWrapper>
  );
};

export default OkPopup;