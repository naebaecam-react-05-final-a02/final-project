'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import Mobile from '@/layouts/Mobile';
import { updateProfile } from '@/service/users.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect } from 'react';
import TextInput from './_components/Input/Input';
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
      alert('수정이 완료되었습니다');
    },
  });

  const handleUpdateProfile = () => {
    const yes = confirm('수정사항을 저장하시겠습니까?');
    if (!yes) return;
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
      <div className="px-14">
        <div>
          <label htmlFor="avatar" className="flex flex-col justify-center items-center">
            <Image src={data?.profileURL || '/user/default-avatar.png'} alt="avatar" width={100} height={100} />
            <p>프로필 변경</p>
          </label>
          <input type="file" id="avatar" name="avatar" hidden />
        </div>
        <div className="flex flex-col gap-4">
          <TextInput label={'닉네임'} value={inputs.nickname} name="nickname" onChange={onChange} type="text" />
          <TextInput
            label={'이메일'}
            value={inputs.email}
            name="email"
            onChange={onChange}
            type="email"
            disabled={true}
          />
          <TextInput label={'키'} value={inputs.height} name="height" onChange={onChange} type="number" />
          <TextInput label={'체중'} value={inputs.weight} name="weight" onChange={onChange} type="number" />
          <div className="flex gap-8 mt-4">
            <button className="bg-gray-200 w-full h-10 flex justify-center items-center">취소</button>
            <button
              className="bg-gray-600 text-white w-full h-10 flex justify-center items-center"
              onClick={handleUpdateProfile}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </Mobile>
  );
};

export default MyPage;
