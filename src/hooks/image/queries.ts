import api from '@/service/service';

export const mutationOptions = {
  upload: {
    mutationFn: (data: { storage: string; form: FormData }) => api.image.upload(data),
  },
};
