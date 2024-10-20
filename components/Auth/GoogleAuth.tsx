import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux';
import { storeJWT } from '../../utils/functions';
import { authSlice } from '../../redux/authSlice';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const GoogleAuth: React.FC = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.auth.isLoggedIn);
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
        .then(async (res) => {
          const token = await res.user.getIdToken();
          return { token, user: res.user }
        })
        .then(async ({ token, user }) => {
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
