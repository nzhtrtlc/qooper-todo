import { useState } from 'react';

import styled from 'styled-components';
import { auth } from 'utils/firebase';
import { useAppDispatch } from 'utils/hooks';
import { resetUser, updateUser } from 'features/user/userSlice';
import { useHistory } from 'react-router-dom';
import { Loading } from 'components';

const LoginPage = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`
const LoginPageBox = styled.div`
  background-color: #343434;
  padding: 35px 25px;
  max-width: 375px;
  flex: 0 0 375px;
`
const LoginTitle = styled.div`
  color: #fff;
  font-size: 17px;
  font-weight: bolder;
  margin-bottom: 15px;
`
const LoginInput = styled.div`
  input {
    background-color: #b3b3b3;
    padding: 14px 10px;
    width: 100%;
    margin-bottom: 15px;
    border: none;
    color: #1d1d1d;
  }
`
const LoginSubmit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    padding: 7px 10px;
    color: #1d1d1d;
    text-decoration: none;
    border: none;
    border-radius: 7px;
    font-weight: 600;
    background-color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`

function Login() {

  const [userName, setUserName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const signIn = () => {
    setAuthLoading(true);
    auth.signInAnonymously()
      .then(async response => {
        // User has session, redirect to app
        if (userName.trim().length > 0) {
          await response.user?.updateProfile({ displayName: userName })
        }
        dispatch(updateUser(response.user));
        history.push('/');
      })
      .catch(() => {
        // No user session, clear store and redirect to login
        dispatch(resetUser());
        history.push('/signIn');
      });
  }

  if (authLoading) return <Loading/>

  return (
    <LoginPage className="login-page">

      <LoginPageBox>
        <LoginTitle>
          Login
        </LoginTitle>
        <LoginInput>
          <input type="text" name="username" id="username" placeholder="Username"
                 onKeyPress={e => e.key === 'Enter' && signIn()}
                 onChange={e => setUserName(e.target.value.trim())}/>
        </LoginInput>
        <LoginSubmit>
          <button className="button button-big" onClick={signIn}>Sign In</button>
        </LoginSubmit>
      </LoginPageBox>

    </LoginPage>
  );
}

export default Login;
