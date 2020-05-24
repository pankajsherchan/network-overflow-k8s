import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {}
});

export default AuthContext;
