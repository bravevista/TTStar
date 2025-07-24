import { useInfiniteQuery } from "@tanstack/react-query";
import { EndlessParams } from "../api/interface/request/endlessParams.request";
import { FriendsListResponse } from "../api/interface/response/friendsList.response";
import { unknown } from "zod";
import { RelationshipModule } from "../api/repository/relationship.repository";

export const useGetFriendsList = ({ limit }: EndlessParams) => {
  return useInfiniteQuery<FriendsListResponse, Error>({
    queryKey: ['friends-list'],
    queryFn: ({ pageParam }: { pageParam?: unknown }) => RelationshipModule.getFriendsList({ cursor: pageParam as string | undefined, limit }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
};
