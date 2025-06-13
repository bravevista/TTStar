type Friend = {
  uuid: string;
  type: string;
  profilephoto: string;
  name: string;
  lastname: string;
  username: string;
  university: string;
  faculty: string;
  universitycareer: string;
};

export interface FriendsListResponse {
  data: Friend[];
  nextCursor?: string;
};
