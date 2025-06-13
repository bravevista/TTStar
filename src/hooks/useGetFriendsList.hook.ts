import { useInfiniteQuery } from "@tanstack/react-query";
import { Params } from "../api/interface/request/params.request";
import { FriendsListResponse } from "../api/interface/response/friendsList.response";
import { unknown } from "zod";
import { RelationshipModule } from "../api/repository/relationship.repository";

export const useGetFriendsList = ({ limit }: Params) => {
  return useInfiniteQuery<FriendsListResponse, Error>({
    queryKey: ['friends-list'],
    queryFn: ({ pageParam }: { pageParam?: unknown }) => RelationshipModule.getFriendsList({ cursor: pageParam as string | undefined, limit }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
};
