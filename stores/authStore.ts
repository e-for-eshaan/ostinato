import { create } from 'zustand';
import { UserCredential } from 'firebase/auth';
import { setJWT } from '../utils/storage';

interface AuthState {
  isLoggedIn: boolean;
  user: UserCredential['user'];
  login: (user: UserCredential['user']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  user: {} as UserCredential['user'],
  login: user => set({ isLoggedIn: true, user }),
  logout: () => {
    setJWT('');
    set({ isLoggedIn: false, user: {} as UserCredential['user'] });
  },
}));
