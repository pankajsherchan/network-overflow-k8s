import { useCallback, useEffect, useState } from 'react';

let logoutTimer = () => {};

const useAuthHook = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((id, token, expirationDate) => {
    setToken(token);
    setUserId(id);
    const calculatedTokenExpirationDate = new Date(
      new Date().getTime() + 1000 * 60 * 60
    );
    setTokenExpirationDate(calculatedTokenExpirationDate);

    localStorage.setItem(
      'user',
      JSON.stringify({
        userId: id,
        token,
        expiration:
          expirationDate || calculatedTokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { userId, token, expiration } = JSON.parse(
        localStorage.getItem('user')
      );

      if (new Date(expiration) > new Date()) {
        login(userId, token, new Date(expiration));
      }
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { login, logout, token, userId };
};

export default useAuthHook;
