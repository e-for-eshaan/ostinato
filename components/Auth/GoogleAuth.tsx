import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { login } from '../../redux/authSlice';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const GoogleAuth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(login({ user: result.user }));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};

export default GoogleAuth;
