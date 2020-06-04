import { useCallback, useContext } from 'react';
import axios from '../AxiosInstance';
import AuthContext from '../context/AuthContext';

const useHttpHook = () => {
  const context = useContext(AuthContext);

  const sendRequest = useCallback(
    async (url, method, params = {}, body = null, config = {}) => {
      config = config ?? {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios({
        method,
        url,
        params,
        config,
        data: body
      });

      return response.data;
    },
    []
  );

  const sendMultiFormRequest = useCallback(
    async (url, method, params = {}, body = null, config = {}) => {
      config = config ?? {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const formData = new FormData();

      Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
      });

      const response = await axios({
        method,
        url,
        params,
        config,
        data: formData
      });

      return response.data;
    },
    []
  );

  return { sendRequest };
};

export default useHttpHook;
