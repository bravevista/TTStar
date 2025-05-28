import { create } from 'zustand';

type User = {
  _id: string;
  type: string;
  code?: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  cellphone?: string;
  gender?: string;
  university: string;
  faculty?: string;
  college?: string;
  universitycareer?: string;
  employer?: string,
  organization?: string;
  job?: string;
  academicdegree?: string;
  birthdaydate?: Date;
  bio?: string;
  links?: {
    [key: string]: string;
  };
  profilephoto: string;
  coverphoto: string;
  profilemusic?: string;
  verifiedidentity?: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
