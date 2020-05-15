import Joi from '@hapi/joi';

export const userValidationSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .required()
    .email(),
  username: Joi.string()
    .required()
    .min(3)
    .max(30),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$' // 1 capital letter, 1 small letter, 1 number, 1 special character, minimum 6 character long
      )
    )
});

export const validateUserUpdateRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }

  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

const getUserValidationSchema = Joi.object().keys({
  username: Joi.string().required()
});

export const validateGetUserRequest = (req, res, next) => {
  console.log(req.params);
  if (!req.params) {
    return res.boom.badRequest('Username value is missing');
  }

  const { error } = getUserValidationSchema.validate(req.params);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};
