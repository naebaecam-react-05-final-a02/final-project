import { useMutation } from '@tanstack/react-query';
import { mutationOptions } from './queries';

// 이미지 업로드
/**
 * @param storage Supabase bucket 이름
 * @param form File 담고 있는 formData ( 파일만 담기 )
 */
export const useImageUpload = () => useMutation(mutationOptions.upload);
