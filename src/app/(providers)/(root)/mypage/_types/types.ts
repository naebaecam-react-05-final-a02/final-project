import { Tables } from '@/types/supabase';

export interface TInputs {
  email: string;
  nickname: string;
  height: number;
  weight: number;
  introduction: string;
}

export interface ProfileFormTypes extends TInputs {
  avatar: File | null;
}

export type myPost = Tables<'communityPosts'>;
export type likesPost = Tables<'communityPostsLikes'> & { communityPosts: Tables<'communityPosts'> };
export type myAnswer = Tables<'communityAnswer'> & {
  communityPosts: Tables<'communityPosts'>;
};

export interface userActivitiesTypes {
  myPosts: myPost[];
  likesPosts: likesPost[];
  myAnswers: myAnswer[];
}

export interface UserData {
  id: string;
  nickname: string;
  level: string;
  profileURL?: string;
}

export interface MyActivityPostTypes {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  dislikes: number;
  score: number;
  commentCount?: number;
  answerCount?: number;
  isLiked: boolean | null;
  user: UserData;
}

export type LikesPostTypes = Tables<'communityPostsLikes'> & {
  post: MyActivityPostTypes;
};

export type MyAnswerTypes = Tables<'communityAnswer'> & {
  post: MyActivityPostTypes;
};
