import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

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
const FormErrorText = styled.span`
  color: #a73737;
`

function Login() {

  const initialFormValues = {
    userName: '',
    firstName: '',
    lastName: '',
  }
  const [formValues, setFormValues] = useState<{ [x: string]: string }>(initialFormValues);
  const [formError, setFormError] = useState<string | boolean>(true);
  const [authLoading, setAuthLoading] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const formValidation = () => {
    const isFormValid = !Object.keys(formValues).filter(key => key !== 'lastName').some(key => formValues[key].trim().length === 0);
    if (!isFormValid)
      setFormError('Please fill all inputs');
    else
      setFormError(false);
  }

  useEffect(() => {
    if (!formError) {
      signIn();
    }
    // eslint-disable-next-line
  }, [formError])

  const signIn = () => {
    setAuthLoading(true);
    auth.signInAnonymously()
      .then(async response => {
        // User has session, redirect to app
        await response.user?.updateProfile({ displayName: formValues.userName })
        dispatch(updateUser(response.user));
        history.push('/');
      })
      .catch(() => {
        // No user session, clear store and redirect to login
        dispatch(resetUser());
        history.push('/signIn');
      });
  }
  const onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      formValidation();
    }
  }
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormError(false);
    setFormValues({ ...formValues, [name]: value });
  }

  const onSignInClick = () => {
    formValidation();
  }

  if (authLoading) return <Loading/>
  return (
    <LoginPage className="login-page">
      <LoginPageBox>
        <LoginTitle>
          Login
        </LoginTitle>
        <LoginInput>
          <input type="text" name="userName" id="username" placeholder="Username *"
                 required
                 onKeyPress={onInputKeyPress}
                 onChange={onInputChange}/>
        </LoginInput>
        <LoginInput>
          <input type="text" name="firstName" id="username" placeholder="First Name *"
                 required
                 onKeyPress={onInputKeyPress}
                 onChange={onInputChange}/>
        </LoginInput>
        <LoginInput>
          <input type="text" name="lastName" id="username" placeholder="Last Name (optional)"
                 onKeyPress={onInputKeyPress}
                 onChange={onInputChange}/>
        </LoginInput>
        {formError &&
        <FormErrorText>{formError}</FormErrorText>
        }
        <LoginSubmit>
          <button className="button button-big" onClick={onSignInClick}>Sign In</button>
        </LoginSubmit>
      </LoginPageBox>
    </LoginPage>
  );
}

export default Login;
