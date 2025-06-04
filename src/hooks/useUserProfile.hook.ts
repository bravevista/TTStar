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
    isFollowing: boolean;
    socialStats: SocialStatistics;
  }>({
    queryKey: ['user-relationship', uuid],
    queryFn: async () => {
      const [relationship, socialStats] = await Promise.all([
        RelationshipModule.getUserRelationship(uuid),
        RelationshipModule.getSocialStatistics(uuid)
      ]);

      return {
        isFollowing: relationship.isFollowing,
        socialStats
      };
    },
    enabled: !!uuid,
  });

  return {
    userData: isOwnProfile ? userMe : userDataQuery.data,
    isFollowing: relationshipQuery.data?.isFollowing ?? false,
    socialStats: relationshipQuery.data?.socialStats ?? {
      numberOfFollowers: 0,
      numberOfFriends: 0
    },
    isLoading: (isOwnProfile ? false : userDataQuery.isLoading) || relationshipQuery.isLoading,
    isOwnProfile,
    error: userDataQuery.error || relationshipQuery.error
  };
}
