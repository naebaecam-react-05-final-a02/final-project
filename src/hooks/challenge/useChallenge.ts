import { useMutation } from '@tanstack/react-query';
import { mutationOptions } from './queries';

// 챌린지 등록
export const useChallengeRegister = () => useMutation(mutationOptions.register);

// 챌린지 인증
export const useChallengeVerify = () => useMutation(mutationOptions.verify);
