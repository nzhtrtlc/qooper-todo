import { AppContainer, AppHeader, Loading } from 'components';
import { updateUser } from 'features/user/userSlice';
import { useEffect, useState } from 'react';
import {
  Route, Switch, RouteProps, Redirect, useHistory
} from 'react-router-dom';
import { auth } from 'utils/firebase';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import PageNotFound from 'views/404';
import Login from 'views/Login';
import TodoApp from 'views/TodoApp';


function PrivateRoute({ children, ...rest }: RouteProps) {
  const user = useAppSelector(state => state.user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.uid ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function Routes(): JSX.Element {

  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(updateUser(user));
        history.push('/');
      } else {
        history.push('/login');
      }
      setIsLoading(false);
    });
  }, [dispatch, history]);

  if (isLoading) return (
    <Loading/>
  )

  return (
    <AppContainer>
      <AppHeader/>
      <Switch>
        <PrivateRoute path="/" exact>
          <TodoApp/>
        </PrivateRoute>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="*" exact>
          <PageNotFound/>
        </Route>
      </Switch>
    </AppContainer>
  )
}

export default Routes;