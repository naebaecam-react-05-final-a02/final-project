import {
  CommentCreateData,
  CommentData,
  CommentUpdateData,
  CommunityPostCreateData,
  CommunityPostData,
  CommunityPostUpdateData,
  CommunityVotePostData,
  ReplyCreateData,
  ReplyData,
  ReplyUpdateData,
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
    pageParam?: number;
    category?: string;
  }): Promise<{ data: CommunityPostData[]; page: number; limit: number; latestVotePost: CommunityVotePostData }> => {
    const response = await axios.get(`${this.baseURL}/posts`, {
      params: { page: pageParam, limit: 10, category },
    });
    return response.data;
  };

  getPostDetail = async (id: string): Promise<CommunityPostData> => {
    const response = await axios.get(`${this.baseURL}/posts/${id}`);
    return response.data;
  };

  getComments = async (postId: string): Promise<CommentData[]> => {
    const response = await axios.get(`${this.baseURL}/posts/${postId}/comments`);
    return response.data;
  };

  addComment = async (data: CommentCreateData): Promise<CommentData> => {
    const response = await axios.post(`${this.baseURL}/posts/${data.postId}/comments`, data);
    return response.data;
  };

  updateComment = async (postId: string, data: CommentUpdateData): Promise<CommentData> => {
    const response = await axios.patch(`${this.baseURL}/posts/${postId}/comments`, data);
    return response.data;
  };

  deleteComment = async (postId: string, commentId: string): Promise<void> => {
    await axios.delete(`${this.baseURL}/posts/${postId}/comments`, { data: { id: commentId } });
  };

  getReplies = async (commentId: string): Promise<ReplyData[]> => {
    const response = await axios.get(`${this.baseURL}/comments/${commentId}/replies`);
    return response.data;
  };

  addReply = async (data: ReplyCreateData): Promise<ReplyData> => {
    const response = await axios.post(`${this.baseURL}/comments/${data.commentId}/replies`, data);
    return response.data;
  };

  updateReply = async (data: ReplyUpdateData): Promise<ReplyData> => {
    const response = await axios.patch(`${this.baseURL}/replies/${data.id}`, data);
    return response.data;
  };

  deleteReply = async (replyId: string): Promise<void> => {
    await axios.delete(`${this.baseURL}/replies/${replyId}`);
  };

  togglePostLike = async (postId: string): Promise<{ isLiked: boolean; likes: number }> => {
    const response = await axios.patch(`${this.baseURL}/likes/${postId}`);
    return response.data;
  };

  toggleCommentLike = async (postId: string, commentId: string): Promise<{ isLiked: boolean; likes: number }> => {
    const response = await axios.patch(`${this.baseURL}/comments/${commentId}/likes`);
    return response.data;
  };

  toggleReplyLike = async (replyId: string): Promise<{ isLiked: boolean; likes: number }> => {
    const response = await axios.patch(`${this.baseURL}/replies/${replyId}/likes`);
    return response.data;
  };

  getPostLikes = async (postId: string): Promise<string[]> => {
    const response = await axios.get(`${this.baseURL}/likes/${postId}`);
    return response.data;
  };

  getCommentLikes = async (commentId: string): Promise<string[]> => {
    const response = await axios.get(`${this.baseURL}/comments/${commentId}/likes`);
    return response.data;
  };

  getReplyLikes = async (replyId: string): Promise<string[]> => {
    const response = await axios.get(`${this.baseURL}/replies/${replyId}/likes`);
    return response.data;
  };
  updateVote = async (data: VoteUpdateData) => {
    const response = await axios.patch(`${this.baseURL}/vote`, data);
    return response.data;
  };
  postVote = async (data: VoteData) => {
    const response = await axios.post(`${this.baseURL}/vote`, data);
    return response.data;
  };
  getVote = async (postId: string) => {
    const response = await axios.get(`${this.baseURL}/vote`, { params: { id: postId } });
    return response.data.data;
  };
  getVoter = async (postId: string) => {
    const response = await axios.get(`${this.baseURL}/voter/${postId}`);
    return response.data;
  };
}

export default CommunityAPI;
