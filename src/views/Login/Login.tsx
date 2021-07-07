import { useState } from 'react';
import './Login.css';

import styled from 'styled-components';
import { auth } from 'utils/firebase';
import { useAppDispatch } from 'utils/hooks';
import { updateUser } from 'features/user/userSlice';
import { useHistory } from 'react-router';

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
`

function Login() {

  const [userName, setUserName] = useState('');

  const history = useHistory();

  const dispatch = useAppDispatch();

  const signIn = () => {
    auth.signInAnonymously()
      .then(async response => {
        console.log('sign in success');
        if (userName.trim().length > 0) {
          await response.user?.updateProfile({ displayName: userName })
        }
        dispatch(updateUser(response.user));
        history.push('/');
      })
      .catch(error => console.log(error));
  }

  return (
    <LoginPage>

      <LoginPageBox>
        <LoginTitle>
          Login
          </LoginTitle>
        <LoginInput>
          <input type="text" name="username" id="username" placeholder="Username" onChange={e => setUserName(e.target.value.trim())} />
        </LoginInput>
        <LoginSubmit>
          <button className="button button-big" onClick={signIn}>Sign In</button>
        </LoginSubmit>
      </LoginPageBox>

    </LoginPage>
  );
}

export default Login;
