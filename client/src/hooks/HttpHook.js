import { useCallback, useContext } from 'react';
import axios from '../AxiosInstance';
import AuthContext from '../context/AuthContext';

const useHttpHook = () => {
  const context = useContext(AuthContext);

  const sendRequest = useCallback(
    async (url, method, body = null, config = {}) => {
      config = config ?? {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios({
        method,
        url,
        config,
        data: body
      });

      return response.data;
    },
    []
  );

  return { sendRequest };
};

export default useHttpHook;
