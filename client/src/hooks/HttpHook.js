import axios from 'axios';
import { useCallback, useContext, useRef, useState } from 'react';
import AuthContext from '../context/AuthContext';

const useHttpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [signal, setSignal] = useState(axios.CancelToken.source());

  const context = useContext(AuthContext);
  console.log('context: ', context);

  // won't be reinitialized when the hook rerenders
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method, body = null, config = {}) => {
      config = config ?? {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        setIsLoading(true);

        const response = await axios({
          method,
          url,
          config,
          data: body,
          cancelToken: signal.token
        });

        // mapping response object to api response
        const res = response.data;
        console.log('res: ', res);

        setIsLoading(false);
        if (res.httpStatus === 200 && res.data) {
          return res;
        } else if (res.httpStatus === 200 && !res.data && res.message) {
          setError({ message: res.message, status: 'Error' });
        }
      } catch (error) {
        console.log('error.response: ', error.response);
        setIsLoading(false);
        const errorInfo = error.response ? error.response.data : null;

        if (axios.isCancel(error)) {
          console.log('error: ', error.message); // => prints: Api is being canceled
        }
        setError({
          message: errorInfo
            ? errorInfo.message
            : 'Something went wrong. Please try again',
          status: 'Error'
        });
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};

export default useHttpHook;
