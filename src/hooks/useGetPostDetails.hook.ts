import { useQuery } from "@tanstack/react-query";
import { PostsModule } from "../api/repository/posts.repository";
import { PostDetails } from "../api/interface/response/postDetails.response";

export function useGetPostDetails(postUuid: string) {
  const postDataQuery = useQuery<PostDetails>({
    queryKey: ['post-details', postUuid],
    queryFn: () => PostsModule.viewPost(postUuid),
    enabled: !!postUuid,
  });

  return {
    postData: postDataQuery.data,
    isLoading: postDataQuery.isLoading,
    error: postDataQuery.error
  };
};
