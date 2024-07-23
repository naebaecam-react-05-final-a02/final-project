'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import Mobile from '@/layouts/Mobile';
import { updateProfile } from '@/service/users.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Input from './_components/Input/Input';
import useInputs from './_hooks/useInputs';
import { TInputs } from './_types/types';

const MyPage = () => {
  const [inputs, onChange, reset, setInputs] = useInputs<TInputs>({ nickname: '', email: '', height: 0, weight: 0 });
  const { data, isPending } = useGetUser();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newProfile: TInputs) => updateProfile(newProfile),
    onSuccess: (status) => {
      if (status !== 200) return;
      queryClient.invalidateQueries({ queryKey: ['user'] });
      console.log(data);
    },
  });

  const handleUpdateProfile = () => {
    mutate(inputs);
  };

  useEffect(() => {
    if (!isPending && data) {
      const { nickname, email, height, weight } = data;
      setInputs({ nickname, email, height, weight });
    }
  }, [isPending, data]);

  if (isPending || !data) return <div>Loading...</div>;

  return (
    <Mobile>
      <div className="flex flex-col gap-4">
        <Input value={inputs.nickname} name="nickname" onChange={onChange} type="text" />
        <Input value={inputs.email} name="email" onChange={onChange} type="email" disabled={true} />
        <Input value={inputs.height} name="height" onChange={onChange} type="number" />
        <Input value={inputs.weight} name="weight" onChange={onChange} type="number" />
        <button onClick={handleUpdateProfile}>수정하기</button>
      </div>
    </Mobile>
  );
};

export default MyPage;
