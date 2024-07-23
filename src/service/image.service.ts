import axios from 'axios';

class ImageAPI {
  private baseURL: string;

  constructor(baseURL: string = '/api/image') {
    this.baseURL = baseURL;
  }

  upload = async (data: { storage: string; form: FormData }) => {
    const { storage, form } = data;
    try {
      const response = await axios.post(`${this.baseURL}/${storage}`, form);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      const err = error as Error;
      throw err;
    }
  };
}

export default ImageAPI;
