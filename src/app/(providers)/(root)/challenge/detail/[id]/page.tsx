import React from 'react';
import Image from 'next/image';

const fetchChallengeData = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/challenges/detail/?id=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch challenge data');
  }
  return res.json();
};

const ChallengeDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const challenge = await fetchChallengeData(id);

  if (!challenge) {
    return <div>없따!</div>;
  }

  return (
    <div className="h-screen">
      <main className="bg-amber-300 pb-7">
        <Image
          src={challenge.imageURL}
          alt="썸네일 이미지"
          width={100}
          height={100}
          className="w-full h-[200px] object-cover mb-5"
        />
        <section className="flex flex-col gap-9 px-6">
          <div className="mb-9">
            <div className="flex flex-row justify-between items-center ">
              <div>{challenge.title}</div>
              <div>
                {challenge.startDate} - {challenge.endDate}
              </div>
            </div>
            <p>{challenge.content}</p>
          </div>
          <div>
            <div className="mb-4">참여 인증 방법</div>
            <p>{challenge.verify}</p>
          </div>
          <div>
            <h1>후기</h1>
            <ul>
              <li>
                <div>
                  <span>4.9</span>
                  <p>
                    유산소 안하고 집오기~~유산소 안하고 집오기~~유산소 안하고 집오기~~유산소 안하고 집오기~~유산소
                    안하고 집오기~~
                  </p>
                  <span>작성자 - 소다</span>
                </div>
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <button className="rounded-lg bg-[#3ECF8E] py-2 w-full" type="button">
            인증하기
          </button>
        </section>
      </main>
    </div>
  );
};

export default ChallengeDetailPage;
