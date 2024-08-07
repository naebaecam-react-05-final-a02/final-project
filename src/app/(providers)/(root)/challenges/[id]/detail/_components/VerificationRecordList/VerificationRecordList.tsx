import Loading from '@/components/Loading/Loading';
import ThumbsUp from '@/icons/ThumbsUp';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ChevronRight from '../ChevronRight';
import Title from '../Title';

interface User {
  profileURL?: string | null;
  nickname?: string | null;
}
interface VerificationRecord {
  id: number;
  userId: string;
  imageURLs: string[];
  impression: string;
  date: string;
  users: User;
}

interface ChallengeInfoMethodProps {
  id: number;
  challengeAuthor: User | null;
}

const VerificationRecordList = ({ id, challengeAuthor }: ChallengeInfoMethodProps) => {
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

  if (loading) return <Loading />;
  console.log('@@verificationRecords', verificationRecords);

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
        <p className="pl-4">챌린지 인증이 없습니다.</p>
      ) : (
        <ul className="flex flex-row gap-3 overflow-y-auto  text-white scroll px-4">
          {verificationRecords.map((record) => (
            <li
              key={record.id}
              className=" rounded-2xl p-4 border-2 border-white/[0.1] flex-none w-[94%] bg-white bg-opacity-5"
            >
              <div className="h-full">
                <div className="flex flex-row mb-2 justify-between">
                  <div className="flex flex-row gap-2 justify-center items-center">
                    {record.imageURLs.map((url, index) => (
                      <Image
                        key={`${record.id}-${url}`}
                        src={url}
                        width={56}
                        height={56}
                        alt={'썸네일 이미지'}
                        className="object-cover w-14 h-14"
                      />
                    ))}
                  </div>
                  <div className="flex flex-row gap-1 text-[12px] text-white font-medium">
                    <ThumbsUp />
                    <span>999</span>
                  </div>
                </div>
                <div className="overflow-hidden text-ellipsis line-clamp-2 text-[14px] mb-4">{record.impression}</div>
                <div className="text-[14px] flex flex-row justify-between">
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <div className="relative w-5 h-5 border-white border rounded-full overflow-hidden">
                      <Image
                        src={record.users?.profileURL ?? '/default-profile.png'}
                        alt={record.users?.nickname ?? 'username'}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>{record.users.nickname}</div>
                  </div>
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
