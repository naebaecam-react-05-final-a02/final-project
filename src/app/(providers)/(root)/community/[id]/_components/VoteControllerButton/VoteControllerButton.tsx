import Button from '@/components/Button';

interface VoteControllerButtonProps {
  isVoting: boolean;
  isVotingStarted: boolean;
  selectedOption: string | null;
  startVoting: () => void;
  submitVote: () => void;
  voteLoading: boolean;
  voterLoading: boolean;
  updatingVote: boolean;
}

const VoteControllerButton = ({
  isVoting,
  isVotingStarted,
  selectedOption,
  startVoting,
  submitVote,
  voteLoading,
  voterLoading,
  updatingVote,
}: VoteControllerButtonProps) => {
  return isVotingStarted ? (
    <Button
      onClick={submitVote}
      className={`${selectedOption ? '' : 'border-white/10 text-white/40'} mt-8`}
      style={{
        background: selectedOption
          ? ''
          : 'radial-gradient(50% 50% at 49.54% 100%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(18, 242, 135, 0.15)',
      }}
      disabled={!selectedOption || updatingVote}
    >
      {selectedOption ? '선택 완료' : '투표할 항목을 선택해주세요'}
    </Button>
  ) : (
    <Button
      onClick={startVoting}
      className="mt-8 w-full px-6 py-[10px] border border-white/30 rounded-lg text-[#12F287]"
      disabled={voteLoading || voterLoading}
      style={{
        background:
          'radial-gradient(50% 50% at 49.54% 100%, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(18, 242, 135, 0.10)',
      }}
    >
      {isVoting ? '투표하기' : '다시 투표하기'}
    </Button>
  );
};
export default VoteControllerButton;
