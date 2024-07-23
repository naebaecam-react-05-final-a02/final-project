import { TInputs } from '@/app/(providers)/(root)/mypage/_types/types';

export const updateProfile = async (newProfile: TInputs) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProfile),
  });

  return response.status;
};
