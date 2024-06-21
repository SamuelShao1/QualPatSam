import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (<div></div>);
};

export default UserProfile;

