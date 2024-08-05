import classNames from 'classnames/bind';
import styles from './uploadForm.module.scss';
import VideoInput from '@/src/components/common/videoInput';
import React, { useState, useEffect } from 'react';
import HoldColorList from '../../climbListDetailPage/holdColorList';
import CommonInput from '../../common/commonInput';
import { useForm } from 'react-hook-form';
import { useFormPostUploadProps, PostDetailDataType } from '@/src/utils/type';
import {
  useDetailUploadDatas,
  usePostDetailUpdate,
} from '@/src/app/climbList/api';
import CommonButton from '../../common/commonButton';

const cn = classNames.bind(styles);

type PostUploadFormProps = {
  gymId: string;
  initialData?: PostDetailDataType;
};

type MediaUrlType = {
  videoUrl: string | null;
  thumbnailUrl: string | null;
};

const PostUploadForm = ({ gymId, initialData }: PostUploadFormProps) => {
  const [mediaUrl, setMediaUrl] = useState<MediaUrlType>({
    videoUrl: initialData?.media || null,
    thumbnailUrl: initialData?.thumbnailUrl || null,
  });
  const [activeColor, setActiveColor] = useState<string | null>(
    initialData?.color || null,
  );
  //난이도 색
  const maxLength = 100;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<useFormPostUploadProps>({
    defaultValues: initialData,
  });
  const text = watch('content', '');

  const { mutate: detailUploadDatas } = useDetailUploadDatas(gymId);
  const { mutate: postDetailUpdate } = usePostDetailUpdate(
    String(initialData?.post_idx),
    String(gymId),
  );

  const onSubmit = (data: useFormPostUploadProps) => {
    const formData = {
      ...data,
      media: mediaUrl.videoUrl,
      thumbnailUrl: mediaUrl.thumbnailUrl,
      color: activeColor,
      gym_idx: Number(gymId),
    };
    if (initialData) {
      postDetailUpdate(formData);
      return;
    }
    detailUploadDatas(formData);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayDate = () => {
    return formatDate(new Date());
  };

  useEffect(() => {
    if (initialData) {
      setValue('clearday', formatDate(new Date(initialData.clearday)));
      setValue('content', initialData.content);
    }
  }, [initialData, setValue]);

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <VideoInput mediaUrl={mediaUrl} setMediaUrl={setMediaUrl} />
      <CommonInput
        id="clearday"
        type="date"
        register={register('clearday', {
          required: '날짜를 선택해주세요',
          validate: (value) =>
            value <= getTodayDate() ||
            '날짜는 오늘 또는 이전 날짜로만 설정할 수 있어요!.',
        })}
      />
      <div className={styles.error_text_wrapper}>
        {errors.clearday && (
          <small className={styles.error_text}>{errors.clearday.message}</small>
        )}
      </div>
      <HoldColorList
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
      <div className={cn('textareaContainer')}>
        <textarea
          className={cn('limitedTextarea')}
          maxLength={maxLength}
          {...register('content', {
            maxLength: {
              value: 100,
              message: '최대 100자까지 가능합니다. ',
            },
          })}
        />
        <div className={cn('charCount')}>
          {text?.length}/{maxLength}
        </div>
      </div>
      <CommonButton
        name={initialData ? '수정하기' : '답지 올리기'}
        type="submit"
      />
    </form>
  );
};

export default PostUploadForm;
