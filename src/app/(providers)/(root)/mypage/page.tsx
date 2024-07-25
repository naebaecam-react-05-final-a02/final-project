'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import Mobile from '@/layouts/Mobile';
import api from '@/service/service';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import TextInput from './_components/Input/Input';
import useInputs from './_hooks/useInputs';
import { TInputs } from './_types/types';

const MyPage = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [inputs, onChange, reset, setInputs] = useInputs<TInputs>({ nickname: '', email: '', height: 0, weight: 0 });
  const { data, isPending } = useGetUser();
  const queryClient = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: (newProfile: ProfileFormTypes) => updateProfile(newProfile),
  //   onSuccess: (status) => {
  //     if (status !== 200) return;
  //     queryClient.invalidateQueries({ queryKey: ['user'] });
  //     alert('수정이 완료되었습니다');
  //   },
  // });

  const handleUpdateProfile = async () => {
    const yes = confirm('수정사항을 저장하시겠습니까?');
    if (!yes) return;

    const formData = new FormData();
    formData.append('nickname', inputs.nickname);
    formData.append('height', inputs.height.toString());
    formData.append('weight', inputs.weight.toString());
    if (avatarFile) formData.append('avatar', avatarFile);

    const response = await api.users.updateUserProfile({ formData });
    console.log(response);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (_.isEmpty(e.target.files)) return;

    const file = e.target.files[0];
    setAvatarFile(file);

    const fileRead = new FileReader();
    fileRead.onload = () => {
      setAvatarPreview(fileRead.result as string);
    };

    fileRead.readAsDataURL(file);
  };

  const handleDeleteAvatar = async () => {
    const yes = confirm('정말로 프로필 이미지를 삭제하시겠습니까?');
    if (!yes) return;

    const response = await api.users.deleteUserAvatar();
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
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="avatar">
            <Image
              className="cursor-pointer rounded-full"
              src={avatarPreview || data?.profileURL || '/user/default-avatar.png'}
              alt="avatar"
              width={100}
              height={100}
            />
          </label>
          <input
            ref={imgRef}
            onChange={handleAvatarChange}
            accept="image/*"
            type="file"
            id="avatar"
            name="avatar"
            hidden
          />
          <button onClick={handleDeleteAvatar}>프로필 이미지 삭제</button>
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
