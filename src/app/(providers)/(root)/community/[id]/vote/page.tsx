// 'use client';

// import Button from '@/components/Button/Button';
// import Loading from '@/components/Loading/Loading';
// import { useGetVoters, useGetVotes as useGetVote, useUpdateVote } from '@/hooks/community/useCommunity';
// import { useEffect, useState } from 'react';
// interface VoteItem {
//   text: string;
//   votes: number;
// }
// const VotePage = ({ params }: { params: { id: string } }) => {
//   console.log('@@params.id', params.id);

//   const [isVoting, setIsVoting] = useState<boolean>(false);
//   const [isVotingStarted, setIsVotingStarted] = useState<boolean>(false);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [selectedInitialOption, setSelectedInitialOption] = useState<string | null>(null);

//   const { data: voteData, isPending: voteLoading } = useGetVote();

//   const { data: voterData, isPending: voterLoading } = useGetVoters(params.id);
//   console.log('@@^^ ', voteData?.id);
//   const { mutate: updateVote, isPending: updatingVote } = useUpdateVote();

//   useEffect(() => {
//     const selectedOption = voterData?.data.selectedOption;

//     if (selectedOption) {
//       setSelectedOption(selectedOption);
//       setSelectedInitialOption(selectedOption);
//     }
//     setIsVoting(voterData?.available);
//     setIsVotingStarted(false);
//   }, [voterData]);

//   if (voteLoading || voterLoading) {
//     return <Loading />;
//   }
//   const itemsArray = JSON.parse(voteData.items);
//   const totalVotes = itemsArray.reduce((sum: number, item: VoteItem) => sum + (item.votes || 0), 0);

//   const handleVote = async () => {
//     if (!selectedOption) {
//       console.error('투표 항목을 선택하세요.');
//       return;
//     }

//     const updatedItems = itemsArray.map((item: VoteItem) => {
//       if (item.text === selectedOption && selectedOption !== selectedInitialOption) {
//         return { ...item, votes: item.votes + 1 };
//       } else if (item.text === selectedInitialOption) {
//         return { ...item, votes: Math.max(0, item.votes - 1) };
//       }
//       return item;
//     });

//     updateVote(
//       { id: voteData.id, items: updatedItems, selectedOption },
//       {
//         onSuccess: () => {
//           setIsVotingStarted(false);
//           setSelectedOption(null);
//           setSelectedInitialOption(selectedOption);
//         },
//         onError: (error: Error) => {
//           console.error('투표 중 오류 발생:', error as Error);
//         },
//       },
//     );
//   };

//   const handleOptionChange = (option: string) => {
//     setSelectedOption(option);
//   };
//   console.log('@@isVoting', isVoting);
//   const handleStartVoting = () => {
//     setIsVotingStarted(true);
//   };

//   return (
//     <div className="bg-black">
//       <article
//         className="p-4 rounded-lg bg-black/5 border-2 border-white/10 min-h-screen text-white flex flex-col items-center"
//         style={{ boxShadow: '-4px -4px 8px 0px rgba(255, 255, 255, 0.05), 4px 4px 8px 0px rgba(0, 0, 0, 0.40)' }}
//       >
//         <h1 className="text-xl font-semibold mb-4">총 {totalVotes}명이 참여했어요!</h1>
//         <div className="w-full max-w-md p-4 rounded-lg bg-black/5 border-white/10 text-white border-2 flex flex-col gap-4">
//           {itemsArray.map((item: VoteItem, index: number) => {
//             const percentage = totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0;

//             return (
//               <div key={index} className="mb-4">
//                 <div className="flex flex-row gap-4 items-end">
//                   {isVotingStarted && (
//                     <input
//                       type="radio"
//                       name="voteOption"
//                       value={item.text}
//                       checked={selectedOption === item.text}
//                       onChange={() => handleOptionChange(item.text)}
//                       className={`appearance-none rounded-full w-5 h-5 border-2 border-[#12F287] bg-white/10
//                       checked:border-[5px] checked:border-primary-100 checked:bg-white`}
//                       style={{
//                         width: '22px',
//                         height: '22px',
//                         cursor: 'pointer',
//                         borderRadius: '50%',
//                         backdropFilter: 'blur(4.285714149475098px)',
//                       }}
//                     />
//                   )}
//                   <div className="flex-auto">
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="ml-2 text-[14px] font-medium leading-5">{item.text}</h3>
//                       <span className="text-[12px] font-medium">{item.votes}명</span>
//                     </div>
//                     <div
//                       className="w-full bg-gray-700 rounded-md h-6"
//                       style={{
//                         background:
//                           'linear-gradient(180deg, rgba(18, 242, 135, 0.30) 0%, rgba(18, 242, 135, 0.15) 100%)',
//                       }}
//                     >
//                       <div
//                         className="flex items-center justify-end py-[2px] px-[6px] bg-green-500 h-6 rounded-md text-white/70 text-right text-[12px]"
//                         style={{ width: `${Math.max(percentage, 10)}%` }}
//                       >
//                         {percentage}%
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           {isVotingStarted ? (
//             <Button
//               onClick={handleVote}
//               className={`${selectedOption ? '' : 'border-white/10 text-white/40'} mt-8`}
//               style={{
//                 background: selectedOption
//                   ? ''
//                   : 'radial-gradient(50% 50% at 49.54% 100%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(18, 242, 135, 0.15)',
//               }}
//               disabled={!selectedOption || updatingVote}
//             >
//               {selectedOption ? '선택 완료' : '투표할 항목을 선택해주세요'}
//             </Button>
//           ) : (
//             <Button
//               onClick={handleStartVoting}
//               className="mt-8 w-full px-6 py-[10px] border border-white/30 rounded-lg text-[#12F287]"
//               disabled={voteLoading || voterLoading}
//               style={{
//                 background:
//                   'radial-gradient(50% 50% at 49.54% 100%, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(18, 242, 135, 0.10)',
//               }}
//             >
//               {isVoting ? '투표하기' : '다시 투표하기'}
//             </Button>
//           )}
//         </div>
//       </article>
//     </div>
//   );
// };

// export default VotePage;
