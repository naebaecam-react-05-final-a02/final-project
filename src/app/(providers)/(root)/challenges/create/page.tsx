'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import Mobile from '@/layouts/Mobile';
import api from '@/service/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import TextInput from './_components/Input/Input';
import useInputs from './_hooks/useInputs';

const ChallengeCreatePage = () => {
  const queryClient = useQueryClient();
  const modal = useModal();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [inputs, onChange, reset, setInputs] = useInputs({ title: '', content: '', startDate: '', endDate: '' });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { mutate: PostChallenge } = useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => api.users.updateUserProfile({ formData }),
    onSuccess: (result) => {
      if (result.status !== 200) return;
      queryClient.invalidateQueries({ queryKey: ['user'] });
      modal.alert(['수정이 완료되었습니다']);
    },
  });

  const handleUpdateProfile = async () => {
    const yes = await modal.confirm(['수정사항을 저장하시겠습니까?']);
    if (!yes) return;

    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('content', inputs.content);
    formData.append('startDate', inputs.startDate);
    formData.append('endDate', inputs.endDate);
    if (image) formData.append('image', image);

    PostChallenge({ formData });
  };

  return (
    <Mobile>
      <div>
        <label htmlFor="image">
          <div className="w-full relative aspect-[4/2.5]">
            {image && imageUrl ? (
              <Image src={imageUrl} alt={'이미지'} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div className=" w-full h-full bg-gray-400"></div>
            )}
          </div>
        </label>
        <input onChange={handleImageChange} id="image" name="image" type="file" accept="image/*" hidden />
        <TextInput onChange={onChange} label="챌린지 이름" name="title" value={inputs.title} />
        <TextInput onChange={onChange} label="챌린지 내용" name="content" value={inputs.content} type="textarea" />
        <h3 className="text-lg font-bold">챌린지 기간</h3>
        <div className="flex">
          <TextInput onChange={onChange} label="" name="startDate" value={inputs.startDate} type="date" />
          <p>~</p>
          <TextInput onChange={onChange} label="" name="endDate" value={inputs.endDate} type="date" />
        </div>
        <button>저장하기</button>
      </div>
    </Mobile>
  );
};

export default ChallengeCreatePage;
