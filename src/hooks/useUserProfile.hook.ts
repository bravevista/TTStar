import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../contexts/store/useUserStore";
import { UserProfile } from "../api/interface/response/userProfile.response";
import { UsersModule } from "../api/repository/users.repository";
import { RelationshipModule } from "../api/repository/relationship.repository";

export function useUserProfile(uuid: string) {
  const userMe = useUserStore(state => state.user);
  const isOwnProfile = userMe?._id === uuid;

  // Solo pedir datos del usuario si no es el perfil propio
  const userDataQuery = useQuery<UserProfile>({
    queryKey: ['user-profile', uuid],
    queryFn: () => UsersModule.aboutThis(uuid),
    enabled: !isOwnProfile && !!uuid,
  });

  // Pedir estado de follow y estadísticas sociales (siempre que haya uuid)
  const relationshipQuery = useQuery<{
    relationship: AreRelated;
    socialStats: SocialStatistics;
  }>({
    queryKey: ['user-relationship', uuid],
    queryFn: async () => {
      const [relationship, socialStats] = await Promise.all([
        RelationshipModule.getUserRelationship(uuid),
        RelationshipModule.getSocialStatistics(uuid)
      ]);

      return {
        relationship,
        socialStats,
      };
    },
    enabled: !!uuid,
  });

  return {
    userData: isOwnProfile ? userMe : userDataQuery.data,
    isOwnProfile,
    relationship: relationshipQuery.data?.relationship ?? {
      isSelf: isOwnProfile,
      isFriend: false,
      isFollowing: false,
      hasSentRequest: false,
      hasReceivedRequest: false,
    },
    socialStats: relationshipQuery.data?.socialStats ?? {
      numberOfFollowers: 0,
      numberOfFriends: 0
    },
    isLoading: (!isOwnProfile && userDataQuery.isLoading) || relationshipQuery.isLoading,
    error: userDataQuery.error || relationshipQuery.error
  };
}
