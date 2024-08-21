import {
  Answer,
  AnswerResponse,
  CommentCreateData,
  CommentData,
  CommentUpdateData,
  CommunityPostCreateData,
  CommunityPostData,
  CommunityPostUpdateData,
  LikeResponse,
  PostsResponse,
  VoteData,
  VoteUpdateData,
} from '@/types/community';
import axios from 'axios';

class CommunityAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/community') {
    this.baseURL = baseURL;
  }

  write = async (data: CommunityPostCreateData) => {
    try {
      const response = await axios.post(`${this.baseURL}/write`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/delete`, { data: { id } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  update = async (data: CommunityPostUpdateData): Promise<CommunityPostData> => {
    try {
      const response = await axios.patch(`${this.baseURL}/posts/${data.id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
  getPosts = async ({
    pageParam = 1,
    category = '전체',
  }: {
    pageParam: number;
    category?: string;
  }): Promise<PostsResponse> => {
    try {
      const response = await axios.get<PostsResponse>(`${this.baseURL}/posts`, {
        params: { page: pageParam, limit: 6, category },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getPostDetail = async (postId: string): Promise<CommunityPostData> => {
    try {
      const response = await axios.get(`${this.baseURL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getComments = async (postId: string): Promise<CommentData[]> => {
    try {
      const response = await axios.get(`${this.baseURL}/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  addComment = async (data: CommentCreateData): Promise<CommentData> => {
    try {
      const response = await axios.post(`${this.baseURL}/posts/${data.postId}/comments`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  updateComment = async (postId: string, data: CommentUpdateData): Promise<CommentData> => {
    try {
      const response = await axios.patch(`${this.baseURL}/posts/${postId}/comments`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  deleteComment = async (postId: string, commentId: string): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/posts/${postId}/comments`, { data: { id: commentId } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  togglePostLike = async (postId: string): Promise<{ isLiked: boolean; likes: number }> => {
    try {
      const response = await axios.patch(`${this.baseURL}/likes/${postId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  toggleCommentLike = async (postId: string, commentId: string): Promise<{ isLiked: boolean; likes: number }> => {
    try {
      const response = await axios.patch(`${this.baseURL}/comments/${commentId}/likes`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getPostLikes = async () => {
    try {
      const response = await axios.get(`${this.baseURL}/likes`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getCommentLikes = async (commentId: string): Promise<string[]> => {
    try {
      const response = await axios.get(`${this.baseURL}/comments/${commentId}/likes`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  updateVote = async (data: VoteUpdateData) => {
    try {
      const response = await axios.patch(`${this.baseURL}/vote`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  postVote = async (data: VoteData) => {
    try {
      const response = await axios.post(`${this.baseURL}/vote`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getVote = async (postId: string) => {
    try {
      const response = await axios.get(`${this.baseURL}/vote`, { params: { id: postId } });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getVoter = async (postId: string) => {
    try {
      const response = await axios.get(`${this.baseURL}/voter/${postId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getAnswers = async (questionId: string): Promise<AnswerResponse> => {
    try {
      const response = await axios.get(`${this.baseURL}/posts/answer`, {
        params: { questionId },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getAnswer = async (answerId: string): Promise<Answer> => {
    try {
      const response = await axios.get(`${this.baseURL}/posts/answer/${answerId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  createAnswer = async (data: { questionId: string; content: string }) => {
    try {
      const response = await axios.post(`${this.baseURL}/posts/answer`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  updateAnswer = async (data: { answerId: string; content: string }) => {
    try {
      const response = await axios.patch(`${this.baseURL}/posts/answer`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  deleteAnswer = async (answerId: string, questionId: string) => {
    try {
      await axios.delete(`${this.baseURL}/posts/answer`, {
        params: { answerId, questionId },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  getAcceptedAnswer = async (questionId: string) => {
    try {
      const response = await axios.get(`${this.baseURL}/posts/community-qa`, {
        params: { questionId },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  acceptAnswer = async (data: { questionId: string; answerId: string }) => {
    try {
      const response = await axios.patch(`${this.baseURL}/posts/community-qa`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  toggleQAPostLike = async (postId: string, likeType: 'like' | 'dislike' | null): Promise<LikeResponse> => {
    try {
      const response = await axios.patch(`${this.baseURL}/likes`, {
        id: postId,
        likeType,
        isAnswer: false,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  toggleQAAnswerLike = async (
    answerId: string,
    postId: string,
    likeType: 'like' | 'dislike' | null,
  ): Promise<LikeResponse> => {
    try {
      const response = await axios.patch(`${this.baseURL}/likes`, {
        id: answerId,
        postId,
        likeType,
        isAnswer: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };
}

export default CommunityAPI;
