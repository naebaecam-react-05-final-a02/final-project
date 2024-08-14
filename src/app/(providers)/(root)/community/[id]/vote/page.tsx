'use client';
import Button from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { useEffect, useState } from 'react';

interface VoteItem {
  text: string;
  votes: number;
}

const VotePage = () => {
  const [voteData, setVoteData] = useState<{ id: number; items: VoteItem[] } | null>(null);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/community/vote', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('데이터 가져오기 실패');
        }

        const result = await response.json();

        const parsedItems = JSON.parse(result.data.items).map((item: VoteItem) => ({
          text: item.text,
          votes: item.votes,
        }));

        const parsedData = {
          id: result.data.id,
          items: parsedItems,
        };
        setVoteData(parsedData);
      } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);
  console.log('@@voteData', voteData);
  if (!voteData) {
    return <Loading />;
  }

  const totalVotes = voteData.items.reduce((sum: number, item: VoteItem) => sum + (item.votes || 0), 0);

  const handleVote = async () => {
    if (!selectedOption) {
      console.error('투표 항목을 선택하세요.');
      return;
    }

    console.log('선택한 항목:', selectedOption);

    try {
      const updatedItems = voteData.items.map((item: VoteItem) =>
        item.text === selectedOption ? { ...item, votes: item.votes + 1 } : item,
      );
      console.log('@@updatedItems', updatedItems);

      const response = await fetch(`/api/community/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: voteData.id, items: updatedItems }),
      });

      if (!response.ok) {
        throw new Error('투표 등록 실패');
      }

      const updatedData = await response.json();
      console.log('입력된 값:', updatedItems);

      setVoteData({
        id: updatedData.id,
        items: JSON.parse(updatedData.data.items),
      });
      setIsVoting(false);
      setSelectedOption(null);
    } catch (error) {
      console.error('투표 중 오류 발생:', error);
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    console.log('선택한 항목:', option);
  };

  const handleStartVoting = () => {
    setIsVoting(true);
  };

  const handleResetVote = () => {
    setIsVoting(false);
    setSelectedOption(null);
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-4">총 {totalVotes}명이 참여했어요!</h1>
      <div className="w-full max-w-md p-4 rounded-lg bg-black/5 border-white/10 text-white border-2 flex flex-col gap-4">
        {voteData.items.map((item: VoteItem, index: number) => {
          const percentage = totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0;

          return (
            <div key={index} className="mb-4">
              <div className="flex flex-row gap-4 items-end">
                {isVoting && (
                  <input
                    type="radio"
                    name="voteOption"
                    value={item.text}
                    checked={selectedOption === item.text}
                    onChange={() => handleOptionChange(item.text)}
                    className="appearance-none rounded-full w-5 h-5"
                    style={{
                      border: '2px solid #12F287',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(255, 255, 255, 0.10)',
                      backdropFilter: 'blur(4.285714149475098px)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = '5px solid #12f287';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = '2px solid #12F287';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.10)';
                    }}
                  />
                )}
                <div className="flex-auto">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="ml-2 text-[14px] font-medium leading-5">{item.text}</h3>
                    <span className="text-[12px] font-medium">{item.votes}명</span>
                  </div>
                  <div
                    className="w-full bg-gray-700 rounded-md h-6"
                    style={{
                      background: 'linear-gradient(180deg, rgba(18, 242, 135, 0.30) 0%, rgba(18, 242, 135, 0.15) 100%)',
                    }}
                  >
                    <div
                      className="flex items-center justify-end py-[2px] px-[6px] bg-green-500 h-6 rounded-md text-white/70 text-right text-[12px]"
                      style={{ width: `${Math.max(percentage, 10)}%` }}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {isVoting ? (
          <Button
            onClick={handleVote}
            className={`mt-6 w-full px-4 py-2 ${
              selectedOption ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600'
            } rounded text-white`}
            disabled={!selectedOption}
          >
            {selectedOption ? '선택 완료' : '투표할 항목을 선택해주세요'}
          </Button>
        ) : (
          <Button
            onClick={handleStartVoting}
            className="mt-6 w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
          >
            투표하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default VotePage;
