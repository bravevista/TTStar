export interface PostDetails {
  user: {
    _id: string;
    type: string;
    name: string;
    lastname: string;
    username: string;
    profilephoto: string;
  };
  content: string;
  image: string;
  created_at: Date;
  stats: {
    supports: number;
    comments: number;
    boosts: number;
    keeps: number;
    views: number;
  };
};
