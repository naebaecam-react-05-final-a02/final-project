// import { useQuery } from '@tanstack/react-query';
// import { Tables } from '@/types/supabase';
// import { PostgrestError } from '@supabase/supabase-js';
// import { createClient } from '@/supabase/client';
//
// type Challenge = Tables<'challenges'>;
// const supabase = createClient();
//
// const fetchChallenge = async (id: number): Promise<Challenge | null> => {
//   const { data, error } = await supabase.from('challenges').select('*').eq('id', id);
//
//   if (error) {
//     throw new Error(error.message);
//   }
//   console.log('@@ data', data)
//   console.log('@@ id', id)
//   if (!data || data.length === 0) {
//     return null; // 데이터가 없을 경우 null 반환
//   }
//
//   if (data.length > 1) {
//     throw new Error('Errorrr');
//   }
//
//   return data[0];
// };
//
// const useChallenge = (id: number) => {
//   return useQuery<Challenge | null, PostgrestError>({
//     queryKey: ['challenge', id],
//     queryFn: async () => await fetchChallenge(id),
//     // enabled: !!id,
//   });
// };
//
// export default useChallenge;
