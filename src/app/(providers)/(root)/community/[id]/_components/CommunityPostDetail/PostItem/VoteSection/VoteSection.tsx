'use client';
import { VoteItem } from '@/app/(providers)/(root)/community/write/_components/VoteRegisterForm/VoteRegisterForm';
import Loading from '@/components/Loading/Loading';
import { useGetVotes as useGetVote, useGetVoters, useUpdateVote } from '@/hooks/community/useCommunity';
import { useEffect, useState } from 'react';
import VoteControllerButton from '../../../VoteControllerButton';
import VoteResult from '../../../VoteResult';

interface VoteComponentProps {
  postId: string;
}

const VoteSection = ({ postId }: VoteComponentProps) => {
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [isVotingStarted, setIsVotingStarted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedInitialOption, setSelectedInitialOption] = useState<string | null>(null);

  const { data: voteData, isPending: voteLoading } = useGetVote(postId);
  const { data: voterData, isPending: voterLoading } = useGetVoters(postId);
  const { mutate: updateVote, isPending: updatingVote } = useUpdateVote();

  useEffect(() => {
    const selectedOption = voterData?.data?.selectedOption;

    if (selectedOption) {
      setSelectedOption(selectedOption);
      setSelectedInitialOption(selectedOption);
    }
    setIsVoting(voterData?.available);
    setIsVotingStarted(false);
  }, [voterData]);

  if (voteLoading || voterLoading) {
    return <Loading />;
  }
  const itemsArray = voteData?.items;

  const totalVotes = itemsArray.reduce((sum: number, item: VoteItem) => sum + (item.votes || 0), 0);

  const handleVote = async () => {
    if (!selectedOption) {
      console.error('투표 항목을 선택하세요.');
      return;
    }

    const updatedItems = itemsArray.map((item: VoteItem) => {
      if (item.text === selectedOption && selectedOption !== selectedInitialOption) {
        return { ...item, votes: item.votes + 1 };
      } else if (item.text === selectedInitialOption) {
        return { ...item, votes: Math.max(0, item.votes - 1) };
      }
      return item;
    });

    updateVote(
      { postId: postId, items: updatedItems, selectedOption },
      {
        onSuccess: () => {
          setIsVotingStarted(false);
          setSelectedOption(null);
          setSelectedInitialOption(selectedOption);
        },
        onError: (error: Error) => {
          console.error('투표 중 오류 발생:', error as Error);
        },
      },
    );
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleStartVoting = () => {
    setIsVotingStarted(true);
  };

  return (
    <article
      className="p-4 rounded-lg bg-black/5 border-2 border-white/10 backdrop-blur-lg text-white flex flex-col items-center"
      style={{
        background: 'rgba(0, 0, 0, 0.05)',
        boxShadow: '-4px -4px 8px 0px rgba(255, 255, 255, 0.05), 4px 4px 8px 0px rgba(0, 0, 0, 0.40)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <h1 className="text-xl font-semibold mb-4">총 {totalVotes}명이 참여했어요!</h1>
      <VoteResult
        totalVotes={totalVotes}
        itemsArray={itemsArray}
        isVotingStarted={isVotingStarted}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
      />
      <VoteControllerButton
        isVoting={isVoting}
        isVotingStarted={isVotingStarted}
        selectedOption={selectedOption}
        startVoting={handleStartVoting}
        submitVote={handleVote}
        voteLoading={voteLoading}
        voterLoading={voterLoading}
        updatingVote={updatingVote}
      />
    </article>
  );
};

export default VoteSection;
