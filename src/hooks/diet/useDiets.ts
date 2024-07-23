import { useMutation } from '@tanstack/react-query';
import { mutationOptions } from './queries';

export const useSaveDiet = () => useMutation(mutationOptions.saveDiet);
