import React, { FC, useState } from 'react';
import styles from './Sidebar.module.scss';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import TagList from '@/components/SideBar/components/TagList/TagList';
import Button from '@/components/Button/Button';
import ParkingSchemeItem from '@/components/SideBar/components/ParkingSchemeItem/ParkingSchemeItem';
import TagWithIcon from '@/components/SideBar/components/TagWithIcon/TagWithIcon';
import humanIcon from '../../assets/icons/human-icon.svg';
import invalidIcon from '../../assets/icons/invalid-icon.svg';
import CloseButton from '@/components/CloseButton/CloseButton';
import OkPopup from '@/components/SideBar/components/OkPopup/OkPopup';
import ErrorTimePopup from '@/components/SideBar/components/ErrorTimePopup/ErrorTimePopup';

const temp = {
  title: 'Луначарского ул. 27А',
  tags: ['129 ₽/час', 'круглосуточно'],
  tags2: ['Охраняемая', 'Наземн.', 'Электрозарядка']
}

type parkItem = {
  id: number,
  isFree: boolean,
  isElectric: boolean,
  isInvalid: boolean,
}

const parkTemp: Array<parkItem> = [
  {id: 1, isFree: true, isElectric: false, isInvalid: false},
  {id: 2, isFree: true, isElectric: false, isInvalid: false},
  {id: 3, isFree: false, isElectric: false, isInvalid: false},
  {id: 4, isFree: false, isElectric: false, isInvalid: false},
  {id: 5, isFree: true, isElectric: false, isInvalid: false},
  {id: 6, isFree: false, isElectric: false, isInvalid: false},
  {id: 7, isFree: false, isElectric: false, isInvalid: false},
  {id: 8, isFree: true, isElectric: false, isInvalid: false},
  {id: 9, isFree: true, isElectric: false, isInvalid: false},
  {id: 10, isFree: true, isElectric: false, isInvalid: false},
  {id: 11, isFree: true, isElectric: true, isInvalid: false},
  {id: 12, isFree: true, isElectric: false, isInvalid: false},
]

interface Props {
  onClose: () => void;
}

const SideBar: FC<Props> = ({onClose}) => {
  const [isBookingInfoOpen, setIsBookingInfoOpen] = useState(false);
  const [isParkingInfoOpen, setIsParkingInfoOpen] = useState(false);
  const [parkingPlace, setParkingPlace] = useState<number | undefined>();
  const [isOkPopupOpen, setIsOkPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const toggleBookingInfo = () => {
    setIsBookingInfoOpen(!isBookingInfoOpen);
  };

  const toggleParkingInfo = () => {
    setIsParkingInfoOpen(!isParkingInfoOpen);
  };

  const handleCloseBooking = () => {
    setIsOkPopupOpen(false);
    onClose();
  }

  return (
    <section className={styles.sidebar}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Луначарского ул. 27А</h1>
        <CloseButton onClose={onClose}/>
      </div>

      <TagList tags={temp.tags}/>

      <div className={styles.timeContainer}>
        <MobileDateTimePicker ampm={false} className={styles.datepiker} label="C"/>
        <MobileDateTimePicker ampm={false} className={styles.datepiker} label="ПО"/>
      </div>

      <button
        className={styles.showMoreBtn}
        type="button"
        onClick={toggleBookingInfo}>
        <h2 className={styles.parkingTitle}>Свободно 5 из 20 мест</h2>
        <div
          className={styles.showMoreBtnIcon}
          style={isBookingInfoOpen ? {transform: 'rotate(90deg)', fill: '#000'} : {}}/>
      </button>

      <div className={`${styles.collapsibleContainer} ${isBookingInfoOpen && styles.collapsibleContainer_open}`}>
        <div className={styles.bookingInfoContainer}>

          <p className={styles.schemeDescription}>Выберите место для своего автомобиля</p>
          <ul className={styles.schemeDescriptContainer}>
            <li className={styles.schemeDescription}>Свободно</li>
            <li className={styles.schemeDescription}>Занято</li>
          </ul>

          <form className={styles.schemeContainer}>
            {parkTemp.map(({id, isFree, isElectric, isInvalid}) => (
              <ParkingSchemeItem
                id={id}
                isFree={isFree}
                isElectric={isElectric}
                isInvalid={isInvalid}
                key={id}
                choosePlace={(place: number) => setParkingPlace(place)}/>
            ))}
          </form>

          {parkingPlace && <p className={styles.yourChoose}>Вы выбрали место №{parkingPlace}</p>}

          <button
            className={styles.showMoreBtn}
            type="button"
            onClick={toggleParkingInfo}>
            <h2 className={styles.parkingTitle}>Информация о парковке</h2>
            <div
              className={styles.showMoreBtnIcon}
              style={isParkingInfoOpen ? {transform: 'rotate(90deg)', fill: '#000'} : {}}/>
          </button>

          <div className={`${styles.collapsibleContainer} ${isParkingInfoOpen && styles.collapsibleContainer_open}`}>
            <div className={styles.parkingInfoContainer}>
              <TagList tags={temp.tags2}/>
              <div className={styles.tagsWithIconContainer}>
                <TagWithIcon icon={humanIcon} text="15 мин до метро"/>
                <TagWithIcon icon={humanIcon} text="15 мин до метро"/>
                <TagWithIcon icon={invalidIcon} text="Места для инвалидов"/>
              </div>
            </div>
          </div>

        </div>

      </div>

      <Button onClick={() => setIsOkPopupOpen(true)} className={styles.bookingBtn}>
        Забронировать
      </Button>

      <OkPopup isOpen={isOkPopupOpen} onClose={handleCloseBooking}/>
      <ErrorTimePopup isOpen={isErrorPopupOpen} onClose={() => setIsErrorPopupOpen(false)}/>
    </section>
  );
};

export default SideBar;