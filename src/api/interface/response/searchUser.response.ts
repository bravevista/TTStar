type User = {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  profilephoto: string;
  coverphoto: string;
  bio: string;
  birthdaydate: number;
  academicdegree?: string;
  job?: string;
  faculty: string;
  college?: string;
  university: string;
  universitycareer: string;
};

export interface SearchUserResponse {
  results: User[];
  nextCursor?: string;
};
