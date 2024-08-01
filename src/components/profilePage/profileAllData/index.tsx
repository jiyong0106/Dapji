'use client';
import classNames from 'classnames/bind';
import styles from './ProfileAllData.module.scss';
import { useState } from 'react';
import ProfileBoardDatas from '../profileBoardData';
import ProfilePostDatas from '../profilePostData';
import { PostIcon, BoardIcon } from '@/public/icon';

const cn = classNames.bind(styles);

const ProfileAllData = () => {
  const [selectList, setSelectList] = useState<string>('post');
  const [underlineStyle, setUnderlineStyle] = useState<any>({ left: '0%' });

  const handleIconClick = (type: string, left: string) => {
    setSelectList(type);
    setUnderlineStyle({ left });
  };

  return (
    <div className={cn('container')}>
      <div className={cn('iconWrapper')}>
        <div
          className={cn('icon')}
          onClick={() => handleIconClick('post', '0%')}
        >
          <PostIcon width="30" height="30" />
        </div>
        <div
          className={cn('icon')}
          onClick={() => handleIconClick('board', '50%')}
        >
          <BoardIcon width="30" height="30" />
        </div>
        <div className={cn('underline')} style={underlineStyle} />
      </div>
      {selectList === 'post' ? <ProfilePostDatas /> : <ProfileBoardDatas />}
    </div>
  );
};

export default ProfileAllData;
