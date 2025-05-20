"use client"
import UserProvider from '../_context/UserProvider';

const Layout = ({children}) => {
  return <UserProvider>{children}</UserProvider>;
}

export default Layout