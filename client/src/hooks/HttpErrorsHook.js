import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from '../AxiosInstance';

const useHttpErrorsHook = () => {
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);

  const inc = useCallback(() => setCounter(counter => counter + 1), [
    setCounter
  ]); // add to counter
  const dec = useCallback(() => setCounter(counter => counter - 1), [
    setCounter
  ]); // remove from counter

  const interceptors = useMemo(
    () => ({
      request: config => {
        inc();
        return config;
      },
      response: response => {
        dec();
        const responseData = response.data;
        if (responseData.httpStatus === 200 && responseData.data) {
          return response;
        } else if (
          responseData.httpStatus === 200 &&
          !responseData.data &&
          responseData.message
        ) {
          setError(responseData.message);
          return response;
        }
        return response; // TODO: return response.data
      },
      error: error => {
        const errorResponse = error.response;
        dec();

        if (!errorResponse) {
          setError('Something went wrong. Please try again');
        }

        setError(
          errorResponse.data.message || 'Something went wrong. Please try again'
        );
        return Promise.reject(error);
      }
    }),
    [inc, dec]
  ); // create the interceptors

  useEffect(() => {
    // if (counter > 0) {
    axios.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    axios.interceptors.response.use(interceptors.response, interceptors.error);
    // }
    // add request interceptors
    return () => {
      // remove all intercepts when done
      axios.interceptors.request.eject(interceptors.request);
      axios.interceptors.request.eject(interceptors.error);
      axios.interceptors.response.eject(interceptors.response);
      axios.interceptors.response.eject(interceptors.error);
    };
  }, [interceptors]);

  const clearError = () => {
    setError(null);
  };

  return { error, clearError, isLoading: counter > 0 };
};

export default useHttpErrorsHook;
