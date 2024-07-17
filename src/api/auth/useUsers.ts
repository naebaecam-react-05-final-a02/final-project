import { Provider } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';

// 유저정보
export const useGetUser = () => useQuery(queryOptions.user());

// 회원가입
export const useSignUp = () => useMutation(mutationOptions.signUp);

// 로그인
export const useSignIn = () => useMutation(mutationOptions.signIn);

// 로그아웃
export const useSignOut = () => useMutation(mutationOptions.signOut);

// 소셜로그인
export const useSocialSignIn = (provider: Provider) => useMutation(mutationOptions.socialSignIn(provider));
