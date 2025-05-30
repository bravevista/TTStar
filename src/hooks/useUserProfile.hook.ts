import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../contexts/store/useUserStore";
import { UserProfile } from "../api/interface/response/userProfile.response";
import { UsersModule } from "../api/repository/users.repository";

export function useUserProfile(uuid: string) {
  const userMe = useUserStore(state => state.user);
  const isOwnProfile = userMe?._id === uuid;

  const { data, isLoading, error } = useQuery<UserProfile>({
    queryKey: ['user-profile', uuid],
    queryFn: async () => {
      return await UsersModule.aboutThis(uuid);
    },
    enabled: !isOwnProfile && !!uuid
  });

  return {
    userData: isOwnProfile ? userMe : data,
    isLoading: !isOwnProfile && isLoading,
    isOwnProfile,
    error
  };
};
