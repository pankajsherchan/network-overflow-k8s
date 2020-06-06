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
    async (url, formData) => {
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      const response = await axios.post(url, formData, config)
      return response.data;
    },
    []
  );

  return { sendRequest, sendMultiFormRequest };
};

export default useHttpHook;
