export const HTTP_RESPONSE_MESSAGES = {
  USER: {
    USER_CREATED_SUCCESSFUL: 'User created successfully',
    USER_CREATED_FAILED: 'User creation failed. Please try again',

    USER_UPDATED_SUCCESSFUL: 'User updated successfully',
    USER_UPDATED_FAILED: 'User update failed. Please try again',

    USER_DELETE_SUCCESSFUL: 'User deleted successfully',
    USER_DELETE_FAILED: 'User deletion failed. Please try again',

    USER_GET_SUCCESSFUL: 'User Retrieved successfully',
    USER_GET_FAILED: 'Error getting in user. Please try again',

    USER_LOGGED_SUCCESSFUL: 'User Logged In Successfully',
    USER_USERNAME_PASSWORD_ERROR: 'Wrong username and password combination',

    USER_PASSWORD_CHANGE_SUCCESSFUL: 'User Password Changed Successfully',
    USER_PASSWORD_CHANGE_FAILED: 'User Password Changed Failed',

    USER_ALREADY_EXIST: 'User Already Exists'
  },
  VERIFICATION: {
    USER_VERIFIED_SUCCESSFUL: 'User verified successfully',
    USER_VERIFIED_FAILED: 'User verification failed. Please try again',
    USER_VERIFICATION_DATA_NOT_FOUND: 'Verification data missing',

    USER_FORGOT_PASSWORD_VERIFIED_SUCCESSFUL:
      'User Forgot Password Request Verified Successfully',
    USER_FORGOT_PASSWORD_VERIFIED_FAILED:
      'User Forgot Password Request Verification Failed. Please try again'
  }
};
