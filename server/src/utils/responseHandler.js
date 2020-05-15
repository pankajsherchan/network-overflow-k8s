import httpStatus from 'http-status-codes';

const checkResponse = response => {
  if (!response || !response.data || response.status !== httpStatus.OK) {
    return false;
  }

  return true;
};

export default checkResponse;
