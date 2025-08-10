import { useInfiniteQuery } from '@tanstack/react-query';
import { ChatsModule } from '../api/repository/chats.repository';
import { ListMessagesParams } from '../api/interface/request/listMessagesParams.request';

export function useListMessages(
  params: Omit<ListMessagesParams, 'cursor'>,
  options?: { enabled?: boolean }
) {
  return useInfiniteQuery({
    queryKey: ['listMessages', params],
    queryFn: async ({ pageParam }: { pageParam?: string }) => {
      return ChatsModule.listMessages({
        ...params,
        cursor: pageParam,
      });
    },
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled !== undefined ? options.enabled : true,
  });
}
