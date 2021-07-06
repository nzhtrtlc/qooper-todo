import React, { useEffect, useState } from 'react';
import './App.css';

import { auth } from 'utils/firebase';

function App() {

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log('user var', uid);
        // ...
      } else {
        // User is signed out
        // ...
        console.log('user yoğtur');
      }
    });
  }, []);

  const [userName, setUserName] = useState('');

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
