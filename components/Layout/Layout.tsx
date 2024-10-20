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

  const fetchUserData = useCallback(async (token: string) => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(authSlice.actions.login({ user: data.user }));
      console.log("User data fetched successfully:", data.user);
    } else {
      console.error("Failed to fetch user data:", data.error);
    }
  }, [])

  const handleFirstLogin = useCallback(async () => {
    try {
      const token = getJWT();
      if (!token) {
        return
      }
      await fetchUserData(token);
    }
    catch (error: any) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    handleFirstLogin()
  }, [])
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-[calc(100vh-192px)]">{children}</div>
      <Footer />
    </main>
  );
};
