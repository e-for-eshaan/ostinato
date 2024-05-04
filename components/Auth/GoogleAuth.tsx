import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login, logout } from '../../redux/authSlice';
import { useSelector } from 'react-redux';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const GoogleAuth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isSignedIn = useSelector<RootState>((state) => (state.auth.isLoggedIn));
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(login({ user: result.user }));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handleSignOut = () => {
    dispatch(logout());
  }

  return <span
    key={String(isSignedIn)}
    onClick={isSignedIn ? handleSignOut : handleSignIn}
  >
    {isSignedIn ? 'Sign out' : 'Sign in'}
  </span>;
};

export default GoogleAuth;
