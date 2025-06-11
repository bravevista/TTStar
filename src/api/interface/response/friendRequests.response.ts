type FriendRequest = {
  uuid: string;
  type: string;
  senderuuid: string;
  profilephoto: string;
  name: string;
  lastname: string;
  username: string;
  universitycareer: string;
  coverphoto: string;
  receiveruuid: string;
  status: string;
  created_at: string;
};

export interface FriendRequestsResponse {
  data: FriendRequest[];
  nextCursor?: string;
};
