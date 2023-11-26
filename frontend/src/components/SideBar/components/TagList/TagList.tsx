import React, { FC } from 'react';
import styles from './TagList.module.scss';
import Tag from '@/components/SideBar/components/Tag/Tag';

const TagList: FC<{ tags: Array<string> }> = ({tags}) => {
  return (
    <div className={styles.tagsContainer}>
      {tags.map((tag, index) => <Tag key={index} text={tag}/>)}
    </div>
  );
};

export default TagList;