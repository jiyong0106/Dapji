import { climbLists } from '@/src/utils/dummy';
import styles from './cardListData.module.scss';
import classNames from 'classnames/bind';
import CardList from '../cardList';
import { ClimbLIstType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type CardListProps = {
  lists: ClimbLIstType[];
};

const CardListData = ({ lists }: CardListProps) => {
  return (
    <div className={cn('container')}>
      {lists.map((list: ClimbLIstType) => (
        <div key={list.gym_idx}>
          <CardList list={list} />
        </div>
      ))}
    </div>
  );
};

export default CardListData;
