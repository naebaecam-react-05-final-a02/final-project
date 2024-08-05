import { useGetUser } from '@/hooks/auth/useUsers';
import ThumbsUp from '@/icons/ThumbsUp';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ChevronRight from '../ChevronRight';
import Title from '../Title';

interface VerificationRecord {
  id: number;
  userId: string;
  imageURL: string;
  impression: string;
  date: string;
}

const VerificationRecordList = ({ id }: { id: number }) => {
  const [verificationRecords, setVerificationRecords] = useState<VerificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerificationRecords = async () => {
      try {
        const response = await fetch(`/api/challenges/verification?id=${id}`);
        const data = await response.json();

        if (response.ok) {
          setVerificationRecords(data);
          console.log('Fetched verification records:', data); // 데이터 콘솔 출력
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationRecords();
  }, [id]);
  console.log('@@verificationRecords', verificationRecords);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <article>
      <div className="flex flex-row justify-between mb-4 px-4">
        <Title>🔥 챌린지 인증</Title>
        <button type="button" className="flex flex-row gap-1 items-center text-white/[0.5] text-[12px]">
          <Link href={`/challenges/${id}/verification/list`} className="inline-flex items-center">
            전체보기 <ChevronRight width={18} height={18} />
          </Link>
        </button>
      </div>
      {verificationRecords.length === 0 ? (
        <p className="pl-4 text-center">챌린지 인증이 없습니다.</p>
      ) : (
        <ul className="flex flex-row gap-3 overflow-y-auto  text-white scroll pl-4">
          {verificationRecords.map((record) => (
            <li className=" rounded-2xl p-4 border-2 border-white/[0.1] flex-none w-[94%] bg-white bg-opacity-5">
              <div className="h-full">
                <div className="flex flex-row gap-2 mb-2 justify-between">
                  <Image
                    src={record.imageURL}
                    width={56}
                    height={56}
                    alt={'썸네일 이미지'}
                    className="object-cover w-14 h-14"
                  />
                  <div className="flex flex-row gap-1 text-[12px] text-white font-medium">
                    <ThumbsUp />
                    <span>999</span>
                  </div>
                </div>
                <div className="overflow-hidden text-ellipsis line-clamp-2 text-[14px] mb-4">{record.impression}</div>
                <div className="text-[14px] flex flex-row justify-between">
                  <div>유저유저유저</div>
                  <div className="text-white/[0.5] text-[12px]">{record.date.slice(0, 10)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default VerificationRecordList;
