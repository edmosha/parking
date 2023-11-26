import React, { FC } from 'react';
import styles from './Tag.module.scss'

const Tag: FC<Record<'text', string>> = ({ text }) => {
  return (
    <div className={styles.tag}>
      {text}
    </div>
  );
};

export default Tag;