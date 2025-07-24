import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../contexts/store/useUserStore';
import { RelationshipModule } from '../api/repository/relationship.repository';
import { UserProfile } from '../api/interface/response/userProfile.response';
import { UsersModule } from '../api/repository/users.repository';

export function useUserCard(uuid: string) {
  const userMe = useUserStore(state => state.user);
  const isOwnProfile = userMe?._id === uuid;

  const userDataQuery = useQuery<UserProfile>({
    queryKey: ['user-card', uuid],
    queryFn: () => UsersModule.aboutThis(uuid),
    enabled: !!uuid,
  });

  const relationshipQuery = useQuery<AreRelated>({
    queryKey: ['relation', uuid, userMe?._id],
    queryFn: () => RelationshipModule.getUserRelationship(uuid),
    enabled: !!uuid,
  });

  return {
    userData: userDataQuery.data,
    isOwnProfile,
    relationship: relationshipQuery.data ?? {
      isSelf: isOwnProfile,
      isFriend: false,
      isFollowing: false,
      hasSentRequest: false,
      hasReceivedRequest: false,
    },
    isLoading: relationshipQuery.isLoading || userDataQuery.isLoading,
    error: relationshipQuery.error || userDataQuery.error,
  };
};
