import Login from '../components/Login';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { authService, firebaseInstance } from '../fabse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const onSocialClick = async (e) => {
  const provider = new firebaseInstance.auth.GoogleAuthProvider();
  await authService.signInWithPopup(provider);
};
function Main() {
  return (
    <div>
      <Login />
      <button onClick={onSocialClick}>
        <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
      </button>
    </div>
  );
}

export default Main;
