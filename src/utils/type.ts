//클라밍장 리스트 데이터

export type ClimbLIstType = {
  gym_idx?: number;
  name: string;
  address?: string;
  logo: string;
  notice?: string | null;
};

//클라이밍장 리스트중 상세 데이터

export type UserType = {
  nickname: string;
};

export type DetailType = {
  post_idx: number;
  user_idx: number;
  gym_idx: number;
  clearday: any;
  content: string | null;
  media: string;
  color: string;
  User: UserType;
  createdAt: any;
};

export type ClimbDetailResponseType = {
  gym_name: string; // 체육관 이름
  posts: DetailType[]; // 게시물 목록
  length?: number;
};

// DetailMainContentProps 타입
export type DetailMainContentProps = {
  list: DetailType;
};

// DetailMainContentListProps 타입
export type DetailMainContentListProps = {
  lists: DetailType[];
};

//업로드 폼 타입
export interface useFormProps {
  date: string;
  text: string;
  video: any;
  // passwordconfirm?: FieldError;
}
