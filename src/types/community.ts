export interface CommunityPostData {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  user: UserData;
}

export interface CommunityPostCreateData {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

interface UserData {
  id: string;
  nickname: string;
  profileURL?: string;
}
