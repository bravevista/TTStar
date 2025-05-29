import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchModule } from '../api/repository/search.repository';
import { SearchParams } from '../api/interface/request/searchParams.request';

export const useSearchUsers = ({ terms, limit = 10 }: SearchParams) => {
  return useInfiniteQuery({
    queryKey: ['search-users', terms],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      SearchModule.searchUsers({ terms, limit, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!terms,
    initialPageParam: undefined,
  });
};
