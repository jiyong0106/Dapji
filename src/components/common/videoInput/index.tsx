'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInput.module.scss';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import instance from '@/src/utils/axios';

const cn = classNames.bind(styles);

type VideoInputProps = {
  mediaUrl: {
    videoUrl: string | null;
    thumbnailUrl: string | null;
  };
  setMediaUrl: React.Dispatch<
    React.SetStateAction<{
      videoUrl: string | null;
      thumbnailUrl: string | null;
    }>
  >;
};

const VideoInput = ({ mediaUrl, setMediaUrl }: VideoInputProps) => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const { mutate: videoUpload, isPending } = useMutation({
    mutationKey: ['videoFile'],
    mutationFn: async (video: FormData) => {
      const response = await instance.post('/api/videos', video, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // API 응답 데이터 반환
    },
    onSuccess: (data) => {
      // 성공적으로 업로드된 경우 mediaUrl을 상태에 저장
      setMediaUrl({
        videoUrl: data.videoUrl,
        thumbnailUrl: data.thumbnailUrl,
      });
      setFileUploaded(true);
    },
    onError: (error) => {
      console.error('파일 업로드 실패:', error);
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('video', files[0]); // 첫 번째 파일을 'video' 키로 추가
      videoUpload(formData); // FormData를 mutate 함수에 전달
    }
  };

  const handleCancel = () => {
    setMediaUrl({
      videoUrl: null,
      thumbnailUrl: null,
    });
    setFileUploaded(false);
  };
  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      {mediaUrl.videoUrl ? (
        <label onClick={handleCancel}>삭제</label>
      ) : (
        <>
          <label htmlFor="fileUpload">업로드</label>
          <input
            type="file"
            id="fileUpload"
            className={cn('filetextInput')}
            multiple
            accept="video/*"
            onChange={handleFileUpload}
          />
        </>
      )}
      <div className={styles.uploadInput}>
        {mediaUrl.videoUrl && (
          <video
            src={mediaUrl.videoUrl}
            controls
            playsInline
            muted
            className={cn('videoPreview')}
            controlsList="nodownload"
          />
        )}
      </div>
    </div>
  );
};

export default VideoInput;
