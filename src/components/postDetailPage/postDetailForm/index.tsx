'use client';
import React from 'react';
import styles from './postDetailForm.module.scss';
import classNames from 'classnames/bind';
import { ShareIcon, DeleteIcon, EditIcon } from '@/public/icon';
import usePostStore from '@/src/utils/store/usePostStore';
import LoadingSpinner from '../../common/loadingSpinner';
import { useRouter } from 'next/navigation';
import {
  usePostDetailDatas,
  usePostDetailDelete,
} from '@/src/app/climbList/api';

const cn = classNames.bind(styles);

type PostDetailFormProps = {
  params: { postid: string; gymId: string };
};

const PostDetailForm = ({ params }: PostDetailFormProps) => {
  const router = useRouter();
  const { postid, gymId } = params;
  const { data: postDetailDatas, isLoading } = usePostDetailDatas(postid);
  const { mutate: postDetailDelete } = usePostDetailDelete(postid, gymId);

  if (isLoading || !postDetailDatas) {
    return <LoadingSpinner />;
  }

  const { gym_idx, post_idx, media, color, clearday, User, content } =
    postDetailDatas;

  const deleteT = (date: string | null) => date?.split('T')[0];

  const shareClick = () => {
    console.log('공유! 또는 링크 복사!');
  };

  const editPage = () => {
    router.push(`/climbList/${gym_idx}/${post_idx}/edit`);
  };

  const deldteClick = () => {
    postDetailDelete();
  };

  return (
    <div className={cn('container')}>
      <div className={cn('btnStyle')}>
        <EditIcon onClick={editPage} />
        <ShareIcon onClick={shareClick} />
        <DeleteIcon onClick={deldteClick} />
      </div>
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
      </div>
      <p>{content}</p>
    </div>
  );
};

export default PostDetailForm;

//다른사람이 볼때 수정 삭제는 안보임
// 수정페이지 안에 삭제 넣기
