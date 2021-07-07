import React, { useEffect, useState } from 'react';
import './App.css';

import { auth } from 'utils/firebase';
import { useAppDispatch } from 'utils/hooks';
import { User } from 'features/counter/counterSlice';
import { updateUser, resetUser } from 'features/user/userSlice';

function App() {
  const [userName, setUserName] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user: User) => {
      if (user) {
        const { displayName, isAnonymous, uid } = user;
        let userDisplayName = displayName;
        if (!user.displayName) {
          user.updateProfile({ displayName: userName })
          userDisplayName = userName;
        }
        dispatch(updateUser({ displayName: userDisplayName, isAnonymous, uid }));
      } else {
        dispatch(resetUser());
      }
    });
  }, [dispatch]);

  const signUp = () => {
    auth.signInAnonymously()
      .then(response => {
        response.user?.updateProfile({ displayName: userName });
      })
      .catch(error => console.warn(error))
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="form-wrapper">
          <div>
            <input type="text" placeholder="test" onChange={e => setUserName(e.target.value)} />
          </div>
          <div>
            <input type="button" value="SignIn Anonymously" onClick={signUp} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
