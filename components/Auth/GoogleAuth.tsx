import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../../firebaseConfig';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const GoogleAuth: React.FC = () => {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error:any) {
      console.error(error.message);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};

export default GoogleAuth;
