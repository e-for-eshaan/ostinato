import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app, auth } from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux';
import { storeJWT } from '../../utils/functions';
import { authSlice } from '../../redux/authSlice';

const provider = new GoogleAuthProvider();

const GoogleAuth: React.FC = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.auth.isLoggedIn);
  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
        .then(async (res) => {
          const credential = GoogleAuthProvider.credentialFromResult(res);
          const token = await res.user.getIdToken();
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          return { token, user: (response.ok ? await response.json() : null) };
        })
        .then(async ({ token, user }) => {
          console.log("User data fetched successfully:", user);
          storeJWT(token);
          dispatch(authSlice.actions.login({ user }));
        });
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handleSignOut = () => {
    dispatch(authSlice.actions.logout());
  };

  return (
    <span key={String(isSignedIn)} onClick={isSignedIn ? handleSignOut : handleSignIn}>
      {isSignedIn ? 'Sign out' : 'Sign in'}
    </span>
  );
};

export default GoogleAuth;
