import React from 'react';
import 'app/App.css';

function SignUp() {
  return (
    <div className="form-wrapper">
      <div>
        <input type="text" placeholder="test"/>
      </div>
      <div>
        <input type="button" value="SignIn Anonymously" />
      </div>
    </div>
  )
}

export default SignUp;