'use client';
import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './ClimbListPage.module.scss';
import CardListData from '@/src/components/climbListPage/cardListData';
import { ClimbListDatas } from '@/src/app/climbList/api';
import { ClimbLIstResponseType } from '@/src/utils/type';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import NodetailData from '@/src/components/common/noDetailData';
import { useQueryClient } from '@tanstack/react-query';

const cn = classNames.bind(styles);

const ClimbListPage = () => {
  const [searchName, setSearchName] = useState('');

  const {
    data: climbListData,
    ref,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteScroll<ClimbLIstResponseType>({
    queryKey: ['climbList', searchName],
    fetchFunction: (page = 1) => ClimbListDatas({ page, search: searchName }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const lists = climbListData?.pages.flatMap((page) => page.gyms) ?? [];

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchName !== '') {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
    }
  }, [searchName, queryClient]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <SearchBar searchName={searchName} onSearchChange={handleSearchChange} />
      <CardListData lists={lists} />
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} />
    </div>
  );
};

export default ClimbListPage;
//서치네임이 있으면 안보여주고 없을때 보여줌
