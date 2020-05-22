import httpStatus from 'http-status-codes';

const checkResponseHandler = response => {
  if (!response || !response.data || response.httpStatus !== httpStatus.OK) {
    return false;
  }

  return true;
};

export default checkResponseHandler;
