import React from 'react';
import Login from './pages/login';
import { CSSTransition, TransitionGroup, SwitchTransition } from "react-transition-group"
import { BrowserRouter as Router, Outlet, Route, useLocation, useRoutes } from 'react-router-dom';
import IndexPage from './pages';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'

function App() {
  
  const location = useLocation()
  return (
    <div className='h-screen'>
      <SwitchTransition mode="out-in">
        <CSSTransition key={location.key} timeout={300} classNames="fade" nodeRef={null}>
          <Page />
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

function Page() {
  const token = useSelector((state: RootState) => state.user.token)
  const hasToken = !!token;
  const route = useLocation();
  // 有 token 但是去 登录注册页
  if (hasToken && ['/login', '/register'].includes(route.pathname)) {
    return <IndexPage />
    // 没有 token 但是去登录注册页
  } else if (!hasToken && ['/login', '/register'].includes(route.pathname)) {
    return <Outlet />
    // 有token 但是去其他页
  }else if(hasToken && !['/login', '/register'].includes(route.pathname)){
    return <Outlet />
  } else {
    return <Login />
  }
}

export default App
