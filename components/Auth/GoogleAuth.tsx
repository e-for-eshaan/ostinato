import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app, auth } from '../../firebaseConfig';
import { useAuthStore } from '../../stores';
import { useState, useCallback, useEffect } from 'react';
import { setJWT, getJWT } from '../../utils/storage';
import { LogOut } from 'lucide-react';

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
          setJWT(token);
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

  if (signInLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader size={16} color="white" />
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <button
        onClick={handleSignOut}
        className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
      >
        <LogOut className="w-3 h-3 mr-1.5" />
        Sign out
      </button>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="inline-flex items-center px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-sm"
    >
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Sign in with Google
    </button>
  );
};

export default GoogleAuth;

type LoaderProps = {
  size?: number; // Size of the loader in pixels
  color?: string; // Color of the loader
};

const Loader: React.FC<LoaderProps> = ({ size = 80, color = 'white' }) => {
  return (
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
  );
};
