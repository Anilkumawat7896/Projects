import {
  //   useQuery,
  useMutation,
  //   useInfiniteQuery,
  //   useQueryClient,
} from "@tanstack/react-query";
import { createUserAccount, singInAccount, singOutAccount } from "../appwrite/apis";
import { INewUser } from "@/types";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSingInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      singInAccount(user),
  });
};
export const useSingOutAccountMutation = () => {
  return useMutation({
    mutationFn: () => singOutAccount(),
  });
};
