'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { DoubleRightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import {
  DetailMainContentProps,
  DetailType,
  DetailMainContentListProps,
} from '@/src/utils/type';
import { useState } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import usePostStore from '@/src/utils/store/usePostStore';

const cn = classNames.bind(styles);

const DetailMainContent = ({ list }: DetailMainContentProps) => {
  const { color, User, clearday, content, post_idx, media, gym_idx } = list;

  const router = useRouter();
  const setPostData = usePostStore((state) => state.setPostData);

  const postDetailPage = () => {
    setPostData(list);
    router.push(`/climbList/${gym_idx}/${post_idx}`);
  };

  const deleteT = (date: string | null) => date?.split('T')[0];

  return (
    <div className={cn('container')}>
      <div className={cn('videoWrapper')}>
        <video
          src={media}
          autoPlay
          muted
          controls
          playsInline
          controlsList="nodownload"
        />
      </div>
      <div className={cn('infoWrapper')}>
        <div className={cn('color', `color-${color}`)} />
        <span>{deleteT(clearday)}</span>
        <span>{User.nickname}</span>
        <DoubleRightArrowIcon onClick={postDetailPage} />
      </div>
      <p>{content}</p>
    </div>
  );
};

const DetailMainContentList = ({ lists }: DetailMainContentListProps) => {
  return (
    <div className={cn('listContainer')}>
      {lists?.map((list: DetailType) => (
        <DetailMainContent key={list.post_idx} list={list} />
      ))}
    </div>
  );
};

export default DetailMainContentList;
