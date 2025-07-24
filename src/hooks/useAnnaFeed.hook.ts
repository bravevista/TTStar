import { useInfiniteQuery } from '@tanstack/react-query';
import { EndlessParams } from '../api/interface/request/endlessParams.request';
import { AnnaModule } from '../api/repository/anna.repository';

export const useAnnaFeed = ({ limit = 10 }: EndlessParams) => {
  return useInfiniteQuery({
    queryKey: ['feed-content'],
    queryFn: ({ pageParam }: { pageParam?: string }) => AnnaModule.feedContent({ limit, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
};
