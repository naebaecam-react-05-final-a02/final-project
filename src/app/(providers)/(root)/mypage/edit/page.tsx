'use client';
import CheckSVG from '@/assets/modal/check.svg';
import Button from '@/components/Button';
import CheckButton from '@/components/ButtonIcon/CheckButton';
import PrevButton from '@/components/ButtonIcon/PrevButton';
import InputText from '@/components/Input/InputText/InputText';
import TitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useGetUser } from '@/hooks/auth/useUsers';
import Mobile from '@/layouts/Mobile';
import api from '@/service/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useInputs from '../_hooks/useInputs';
import { TInputs } from '../_types/types';

const MyProfileEditPage = () => {
  const modal = useModal();
  const router = useRouter();
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(true);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [inputs, onChange, reset, setInputs] = useInputs<TInputs>({
    nickname: '',
    email: '',
    introduction: '',
    height: 0,
    weight: 0,
  });
  const { data, isPending } = useGetUser();
  const queryClient = useQueryClient();

  const { mutate: updateProfile } = useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => api.users.updateUserProfile({ formData }),
    onSuccess: async (result) => {
      if (result.status !== 200) return;
      queryClient.invalidateQueries({ queryKey: ['user'] });
      await modal.alert(['수정이 완료되었습니다']);
      router.replace('/mypage');
    },
  });

  const { mutate: deleteProfile } = useMutation({
    mutationFn: async () => api.users.deleteUserAvatar(),
    onSuccess: async (result) => {
      if (result.status !== 200) return;
      queryClient.invalidateQueries({ queryKey: ['user'] });
      await modal.alert(['삭제가 완료되었습니다.']);
    },
  });

  const validateNickname = async () => {
    if (!inputs.nickname) return modal.alert(['닉네임을 입력해주세요']);
    const { isAvailable } = await api.users.validateNickname({ nickname: inputs.nickname });
    if (!isAvailable) return await modal.alert(['이미 사용중인 닉네임입니다']);
    await modal.alert(['사용가능한 닉네임입니다']);
    return setIsNicknameValid(true);
  };

  const handleUpdateProfile = async () => {
    const yes = await modal.confirm(['수정사항을 저장하시겠습니까?']);
    if (!yes) return;

    if (!isNicknameValid) return modal.alert(['닉네임 중복여부를 확인해주세요']);

    const formData = new FormData();
    if (inputs.nickname) formData.append('nickname', inputs.nickname);
    if (inputs.introduction) formData.append('introduction', inputs.introduction);
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
    const yes = await modal.confirm(['정말로 프로필 이미지를 삭제하시겠습니까?']);
    if (!yes) return;

    deleteProfile();
  };

  useEffect(() => {
    if (!isPending && data) {
      const { nickname, email, height, weight, introduction } = data;
      setInputs({
        nickname: nickname as string,
        email,
        height: height as number,
        weight: weight as number,
        introduction: introduction as string,
      });
    }
  }, [isPending, data]);

  useEffect(() => {
    if (data?.nickname === inputs.nickname) {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }
  }, [inputs.nickname]);

  if (isPending || !data) return <div>Loading...</div>;

  return (
    <Mobile
      headerLayout={
        <TitleHeader leftButton={<PrevButton />} rightButton={<CheckButton onClick={handleUpdateProfile} />}>
          프로필 수정
        </TitleHeader>
      }
    >
      <div className="">
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
          <button className="text-[12px] text-gray-300 border-b border-gray-300 mt-2" onClick={handleDeleteAvatar}>
            프로필 삭제
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-2">
            <InputText
              className="w-full"
              label={'닉네임'}
              id={'nickname'}
              onChange={(e) => {
                onChange(e);
              }}
              value={inputs.nickname}
              type={'text'}
              name={'nickname'}
            />

            <div className="w-[64px] flex items-end">
              {isNicknameValid ? (
                <button className="w-full h-[50px] flex py-[13px] justify-center items-center " disabled>
                  <CheckSVG />
                </button>
              ) : (
                <Button
                  onClick={() => {
                    validateNickname();
                  }}
                  className="w-[64px] text-sm"
                >
                  <p className="w-full">확인</p>
                </Button>
              )}
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
              inputType="textarea"
              name={'introduction'}
              label={'소개'}
              id={'introduction'}
              onChange={onChange}
              value={inputs.introduction}
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
              className="appearance-none  [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
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
              className="appearance-none  [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>
    </Mobile>
  );
};

export default MyProfileEditPage;
