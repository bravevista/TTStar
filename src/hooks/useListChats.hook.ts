import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatsModule } from "../api/repository/chats.repository";
import { ListChatsParams } from "../api/interface/request/listChatsParams.request";

export function useListChats(params: Omit<ListChatsParams, "cursor">) {
    return useInfiniteQuery({
        queryKey: ["listChats", params],
        queryFn: async ({ pageParam }: { pageParam?: string }) => {
            return ChatsModule.listChats({
                ...params,
                cursor: pageParam,
            });
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        initialPageParam: undefined,
        staleTime: 1000 * 60 * 5,
    })
}