import axios from 'axios';

class UsersAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/users') {
    this.baseUrl = baseUrl;
  }

  updateUserProfile = async ({ formData }: { formData: any }) => {
    const response = await axios.patch(`${this.baseUrl}/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  };

  deleteUserAvatar = async () => {
    const response = await axios.delete(`${this.baseUrl}/profile/avatar`);
    return response;
  };

  validateNickname = async ({ nickname }: { nickname: string }) => {
    const response = await axios.get(`${this.baseUrl}/nickname?nickname=${nickname}`);
    const data = response.data;
    return data;
  };
}

export default UsersAPI;
