import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyA-XvpyjhLERrBH-dnV1ZXh_TeVK8er4E0',
  authDomain: 'gym-buddy-ap.web.app',
  projectId: 'gym-buddy-ap',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
