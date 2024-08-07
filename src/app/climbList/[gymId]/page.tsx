'use client';

import classNames from 'classnames/bind';
import styles from './DetailPage.module.scss';
import Notification from '@/src/components/climbListDetailPage/notification';
import HoldColorList from '@/src/components/climbListDetailPage/holdColorList';
import DetailMainContentList from '@/src/components/climbListDetailPage/detailMainContent';
import { AddIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import { ClimbDetailDatas } from '@/src/app/climbList/api';
import NodetailData from '@/src/components/common/noDetailData';
import { useState } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import Header from '@/src/components/common/header';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ClimbDetailResponseType } from '@/src/utils/type';

const cn = classNames.bind(styles);
type DetailPageProps = {
  params: { gymId: string };
};

const DetailPage = ({ params }: DetailPageProps) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isUpLoading, setIsUpLoading] = useState(false);

  const router = useRouter();
  const { gymId } = params;

  const {
    data: climbDetailData,
    ref,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteScroll<ClimbDetailResponseType>({
    queryKey: ['climbDetail', gymId, activeColor],
    fetchFunction: (pageParam = 1) =>
      ClimbDetailDatas({ pageParam, gymId, color: activeColor }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });
  const lists = climbDetailData?.pages.flatMap((page) => page.posts) ?? [];
  const gymName = climbDetailData?.pages[0]?.gym_name ?? '';
  // 뒤로가기
  const uploadPage = () => {
    setIsUpLoading(true);
    router.push(`/climbList/${gymId}/upload`);
  };
  //업로드 페이지

  if (isLoading || isUpLoading) {
    return <LoadingSpinner />;
  }

  //로딩중 들어가야할 것
  return (
    <div className={cn('container')}>
      <Header title={gymName}>
        <AddIcon onClick={uploadPage} />
      </Header>
      <div className={cn('secondContainer')}>
        <Notification />
        <HoldColorList
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        <DetailMainContentList lists={lists} />
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
      {!hasNextPage && <NodetailData />}
      <div ref={ref} />
    </div>
  );
};

export default DetailPage;
