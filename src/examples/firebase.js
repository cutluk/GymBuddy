import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyCR849pbllYxmzNLLcWIgOPhXtQqBfWM94',
  authDomain: 'https://gym-buddy-5834a.web.app',
  projectId: 'gym-buddy-5834a',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
