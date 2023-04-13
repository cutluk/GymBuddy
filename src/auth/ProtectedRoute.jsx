import {Navigate, Outlet} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../pages/firebase';


const ProtectedRoute = ({path, element
  }) => {
    const [user, setUser] = useState(auth.currentUser);
    useEffect(() => {
      auth.onAuthStateChanged(currUser => {
        setUser(currUser);
        console.log(currUser);
      });
    }, [])
  
    return user ? <Outlet /> : <Navigate to={'/'} />;
      
};


export default ProtectedRoute;