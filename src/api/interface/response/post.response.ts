type Post = {
  uuid: string;
  creators: string[];
  scope: string;
  category: string;
  images: string[];
  content: string;
  created_at: string;
  feedScore: number;
};

export interface PostResponse {
  data: Post[];
  nextCursor?: string;
};
