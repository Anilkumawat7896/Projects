import {
  useMutation,
  useQuery,
  // useInfiniteQuery,
  useQueryClient,
  // QueryClient,
} from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  getRecentPosts,
  singInAccount,
  singOutAccount,
} from "../appwrite/apis";
import { INewPost, INewUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

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

/*--------------*/
/* Post Queries */
/*--------------*/

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};
