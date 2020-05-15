import * as userService from '../../services/user.service';
import catchAsync from '../../utils/catchAsync';

export const signup = catchAsync(async (req, res, next) => {
  const userResponse = await userService.saveUser(req.body);
  await userService.sendUserVerificationEmail(
    req.body.username,
    req.body.email
  );
  res.send(userResponse);
});
