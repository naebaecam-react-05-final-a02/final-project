'use client';
import Button from '@/components/Button';
import CheckButton from '@/components/ButtonIcon/CheckButton';
import PrevButton from '@/components/ButtonIcon/PrevButton';
import InputText from '@/components/Input/InputText/InputText';
import TitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import { useGetUser } from '@/hooks/auth/useUsers';
import Mobile from '@/layouts/Mobile';
import api from '@/service/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useInputs from '../_hooks/useInputs';
import { TInputs } from '../_types/types';

const MyProfileEditPage = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [inputs, onChange, reset, setInputs] = useInputs<TInputs>({ nickname: '', email: '', height: 0, weight: 0 });
  const { data, isPending } = useGetUser();
  const queryClient = useQueryClient();
  console.log(inputs);

  const { mutate: updateProfile } = useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => api.users.updateUserProfile({ formData }),
    onSuccess: (result) => {
      if (result.status !== 200) return;
      queryClient.invalidateQueries({ queryKey: ['user'] });
      alert('수정이 완료되었습니다');
    },
  });

  const { mutate: deleteProfile } = useMutation({
    mutationFn: async () => api.users.deleteUserAvatar(),
    onSuccess: (result) => {
      if (result.status !== 200) return;
      queryClient.invalidateQueries({ queryKey: ['user'] });
      alert('삭제가 완료되었습니다.');
    },
  });

  const handleUpdateProfile = async () => {
    const yes = confirm('수정사항을 저장하시겠습니까?');
    if (!yes) return;

    const formData = new FormData();
    if (inputs.nickname) formData.append('nickname', inputs.nickname);
    if (inputs.height) formData.append('height', inputs.height.toString());
    if (inputs.weight) formData.append('weight', inputs.weight.toString());
    if (avatarFile) formData.append('avatar', avatarFile);

    updateProfile({ formData });
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

    deleteProfile();
  };

  useEffect(() => {
    if (!isPending && data) {
      const { nickname, email, height, weight } = data;
      setInputs({ nickname: nickname as string, email, height: height as number, weight: weight as number });
    }
  }, [isPending, data]);

  if (isPending || !data) return <div>Loading...</div>;

  return (
    <Mobile
      headerLayout={
        <TitleHeader leftButton={<PrevButton />} rightButton={<CheckButton onClick={handleUpdateProfile} />}>
          프로필 수정
        </TitleHeader>
      }
    >
      <div className="px-4">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="avatar">
            <div className="relative w-16 h-16">
              <Image
                className="cursor-pointer rounded-full border border-white object-cover"
                src={avatarPreview || data?.profileURL || '/user/default-avatar.png'}
                alt="avatar"
                fill
              />
            </div>
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
          <button className="text-sm text-primary-100 border-b border-primary-100 mt-2" onClick={handleDeleteAvatar}>
            프로필 삭제
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-2">
            <InputText
              className="w-full"
              label={'닉네임'}
              id={'nickname'}
              onChange={onChange}
              value={inputs.nickname}
              type={'text'}
              name={'nickname'}
            />

            <div className="w-[64px] flex items-end">
              <Button className="w-[64px] text-sm">
                <p className="w-full">확인</p>
              </Button>
            </div>
          </div>
          <div className="flex">
            <InputText
              name={'email'}
              label={'이메일'}
              id={'email'}
              onChange={onChange}
              value={inputs.email}
              type={'email'}
              disabled={true}
            />
          </div>
          <div className="flex">
            <InputText
              name={'height'}
              label={'키'}
              id={'height'}
              onChange={onChange}
              value={inputs.height}
              type={'number'}
              unit={'cm'}
            />
          </div>
          <div className="flex">
            <InputText
              name={'weight'}
              label={'체중'}
              id={'weight'}
              onChange={onChange}
              value={inputs.weight}
              type={'number'}
              unit={'kg'}
            />
          </div>
        </div>
      </div>
    </Mobile>
  );
};

export default MyProfileEditPage;
