import { loginGoogle } from '@/services/auth/loginGoogle';
import { setToken } from '@/services/keychain/token';
import { useMutation } from '@tanstack/react-query';

interface ILoginResponse {
  loginMutate: () => void;
  isSuccess: boolean;
  isError: boolean;
  isPending: boolean;
}

export const useLoginGoogle = (): ILoginResponse => {
  const {
    mutate: loginMutate,
    isSuccess,
    isError,
    isPending,
  } = useMutation<string, Error>({
    mutationKey: ['loginGoogle'],
    mutationFn: loginGoogle,
    onSuccess: (data: string) => {
      setToken(data);
    },
  });

  return { loginMutate, isSuccess, isError, isPending };
};
