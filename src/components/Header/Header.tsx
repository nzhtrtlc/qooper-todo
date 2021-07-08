import React from 'react';
import { resetUser } from 'features/user/userSlice'
import { RouteProps, useHistory, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from 'utils/firebase'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px 0;
`

export const HeaderTitle = styled.div`
  flex: 0 0 50%;
  max-width: 50%;

  h1 {
    font-size: 30px;
    font-weight: 900;
    margin: 0;
    cursor: default;
  }
`

export const HeaderUser = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  .header-user-logout span {
    padding-left: 10px;
    cursor: pointer;
  }
`

export const HeaderUserName = styled.div`
  font-size: 14px;
  color: #b3b3b3;
  padding-right: 10px;
`

const Button = styled.button`
  padding: 7px 10px;
  color: #1d1d1d;
  text-decoration: none;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  background-color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`

function LogOutButton({
                        text,
                        onClick
                      }: { text?: string, onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined }) {
  return (
    <Button onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="19.022" height="19.022" viewBox="0 0 19.022 19.022">
        <g transform="translate(0 -0.004)">
          <path
            d="M11.889,10.307a.792.792,0,0,0-.793.793v3.17a.793.793,0,0,1-.793.793H7.926V3.174A1.6,1.6,0,0,0,6.846,1.667l-.235-.079H10.3a.793.793,0,0,1,.793.793V4.759a.793.793,0,0,0,1.585,0V2.382A2.381,2.381,0,0,0,10.3,0H1.783A.623.623,0,0,0,1.7.021C1.66.018,1.624,0,1.585,0A1.587,1.587,0,0,0,0,1.589V15.855a1.6,1.6,0,0,0,1.079,1.507l4.77,1.59a1.641,1.641,0,0,0,.491.074A1.587,1.587,0,0,0,7.926,17.44v-.793H10.3a2.381,2.381,0,0,0,2.378-2.378V11.1a.792.792,0,0,0-.793-.793Zm0,0"
            transform="translate(0)"/>
          <path
            d="M285.818,110.068l-3.17-3.17a.792.792,0,0,0-1.353.56v2.378h-3.17a.793.793,0,1,0,0,1.585h3.17V113.8a.792.792,0,0,0,1.353.56l3.17-3.17a.792.792,0,0,0,0-1.121Zm0,0"
            transform="translate(-267.029 -102.699)"/>
        </g>
      </svg>
      <span>
        {text || 'Log Out'}
      </span>
    </Button>
  )
}

function AppHeader(props: RouteProps): JSX.Element {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const signOut = () => {
    dispatch(resetUser());
    auth.signOut().then(() => {
      history.push('/login')
    });
  }
  return (
    <Header>
      <HeaderTitle>
        <h1>
          {props.location?.pathname.includes('login') ? 'Sign In' : 'Todo App'}
        </h1>
      </HeaderTitle>
      {user.uid && <HeaderUser className="header-user">
        <HeaderUserName>{user.displayName}</HeaderUserName>
        <div className="header-user-logout">
          <LogOutButton onClick={signOut}/>
        </div>
      </HeaderUser>
      }
    </Header>
  )
}

export default withRouter(AppHeader);