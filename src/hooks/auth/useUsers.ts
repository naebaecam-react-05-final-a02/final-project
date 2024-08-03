import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';

// 유저정보
export const useGetUser = () => useQuery(queryOptions.user());

// 회원가입
export const useSignUp = () => useMutation(mutationOptions.signUp);

// 로그인
export const useSignIn = () => useMutation(mutationOptions.signIn);

// 로그아웃
export const useSignOut = (options?: Omit<UseMutationOptions, 'mutationFn'>) =>
  useMutation({ ...mutationOptions.signOut, ...options });

// 소셜로그인
export const useSocialSignIn = () => useMutation(mutationOptions.socialSignIn());

// 이메일 또는 닉네임 중복 확인
export const useCheckDuplicate = () => useMutation(mutationOptions.checkDuplicate);

// 비밀번호 재설정 요청
export const useRequestPasswordReset = () => useMutation(mutationOptions.requestPasswordReset);

// 인증 번호 확인
export const useVerifyResetCode = () => useMutation(mutationOptions.verifyResetCode);

// 비밀번호 변경
export const useResetPassword = () => useMutation(mutationOptions.resetPassword);

// 회원탈퇴
export const useDeleteAccount = (options?: Omit<UseMutationOptions, 'mutationFn'>) =>
  useMutation({ ...mutationOptions.deleteAccount, ...options });
