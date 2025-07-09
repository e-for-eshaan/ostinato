import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app, auth } from '../../firebaseConfig';
import { storeJWT, getJWT } from '../../utils/functions';
import { useAuthStore } from '../../stores';
import { useState, useCallback, useEffect } from 'react';

const provider = new GoogleAuthProvider();

const GoogleAuth: React.FC = () => {
  const { isLoggedIn: isSignedIn, login, logout } = useAuthStore();
  const provider = new GoogleAuthProvider();
  const [signInLoading, setSignInLoading] = useState(false);

  const handleSignIn = async () => {
    setSignInLoading(true);
    try {
      const result = await signInWithPopup(auth, provider)
        .then(async res => {
          const credential = GoogleAuthProvider.credentialFromResult(res);
          const token = await res.user.getIdToken();
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          return { token, user: response.ok ? await response.json() : null };
        })
        .then(async ({ token, user }) => {
          console.log('User data fetched successfully:', user);
          storeJWT(token);
          login(user);
        });
    } catch (error: any) {
      console.error(error.message);
    }
    setSignInLoading(false);
  };

  const handleSignOut = () => {
    logout();
  };

  const fetchUserData = useCallback(async (token: string) => {
    setSignInLoading(true);
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (response.ok) {
      login(data.user);
      console.log('User data fetched successfully:', data.user);
    } else {
      console.error('Failed to fetch user data:', data.error);
    }
    setSignInLoading(false);
  }, []);

  const handleFirstLogin = useCallback(async () => {
    setSignInLoading(true);
    try {
      const token = getJWT();
      if (!token) {
        setSignInLoading(false);
        return;
      }
      await fetchUserData(token);
    } catch (error: any) {
      console.error(error.message);
    }
    setSignInLoading(false);
  }, []);

  useEffect(() => {
    handleFirstLogin();
  }, []);

  return (
    <span key={String(isSignedIn)} onClick={isSignedIn ? handleSignOut : handleSignIn}>
      {signInLoading ? <Loader size={20} /> : isSignedIn ? 'Sign out' : 'Sign in'}
    </span>
  );
};

export default GoogleAuth;

type LoaderProps = {
  size?: number; // Size of the loader in pixels
  color?: string; // Color of the loader
};

const Loader: React.FC<LoaderProps> = ({ size = 80, color = 'white' }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="283" // 2 * π * 45 (circumference of the circle)
          strokeDashoffset="75" // Adjust this value for animation
        />
      </svg>
    </div>
  );
};
