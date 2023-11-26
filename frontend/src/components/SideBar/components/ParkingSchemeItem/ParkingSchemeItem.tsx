import React, { FC } from 'react';
import styles from './ParkingSchemeItem.module.scss';
import Image from 'next/image';
import electricIcon from '../../../../assets/icons/electric.svg';

interface Props {
  id: number;
  isFree: boolean;
  isElectric: boolean;
  isInvalid: boolean;
  choosePlace: (place: number) => void;
}

const ParkingSchemeItem: FC<Props> = ({id, isFree, isElectric, choosePlace}) => {
  return (
    <label className={`${styles.item} ${isFree ? styles.free : styles.notFree}`} onClick={() => choosePlace(id)}>
      <input type="radio" name="parking-item" className={styles.input}/>
      {isElectric && (<Image
        src={electricIcon}
        width={28}
        height={28}
        alt="электро место"
        className={styles.image}/>)}
    </label>
  );
};

export default ParkingSchemeItem;