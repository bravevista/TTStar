import { useInfiniteQuery } from '@tanstack/react-query';
import { RelationshipModule } from '../api/repository/relationship.repository';
import { GetFriendRequestsParams } from '../api/interface/request/getFriendRequestsParams.request';
import { FriendRequestsResponse } from '../api/interface/response/friendRequests.response';

export const useGetFriendRequests = ({ limit }: GetFriendRequestsParams) => {
  return useInfiniteQuery<FriendRequestsResponse, Error>({
    queryKey: ['friend-requests'],
    queryFn: ({ pageParam }: { pageParam?: unknown }) => RelationshipModule.getFriendRequests({ cursor: pageParam as string | undefined, limit }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
};
