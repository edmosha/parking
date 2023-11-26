import React, { FC } from 'react';
import styles from './TagWithIcon.module.scss';
import Image from 'next/image';

interface Props {
  text: string;
  icon: any;
}

const TagWithIcon: FC<Props> = ({text, icon}) => {
  return (
    <div className={styles.tagContainer}>
      <Image src={icon} width={28} height={28} alt={text} className={styles.icon} />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default TagWithIcon;