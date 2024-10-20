import { Navbar, Footer } from '../../components';
import { getJWT } from '../../utils/functions';
import { useCallback, useEffect } from 'react';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useDispatch } from '../../redux';
import { authSlice } from '../../redux/authSlice';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const login = useCallback(async () => {
    try {
      const token = getJWT();
      if (!token) {
        return
      }
      const userCredential = await signInWithCustomToken(auth, token);
      dispatch(authSlice.actions.login({ user: userCredential.user }));
      return userCredential;
    }
    catch (error: any) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    login()
  }, [])
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-[calc(100vh-192px)]">{children}</div>
      <Footer />
    </main>
  );
};
