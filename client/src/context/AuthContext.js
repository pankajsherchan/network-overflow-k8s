import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: { token: '' },
  setIsLoggedIn: () => {}
});

export default AuthContext;
