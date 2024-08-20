export const initialChallengeError: { [key: string]: string } = {
  image: '',
  title: '',
  content: '',
  startDate: '',
  endDate: '',
  category: '',
};

export const initialChallengeVerificationError: { [key: string]: string } = {
  image: '',
  impression: '',
};

export const categoryOptions = [{ value: '운동' }, { value: '식단' }, { value: '생활' }, { value: '기타' }];
export const categoryItemsKORtoENG: { [key: string]: string } = {
  운동: 'exercise',
  식단: 'diet',
  생활: 'lifestyle',
  기타: 'etc',
};
export const categoryItemsENGtoKOR: { [key: string]: string } = {
  exercise: '운동',
  diet: '식단',
  lifestyle: '생활',
  etc: '기타',
};
