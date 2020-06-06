import Joi from '@hapi/joi';

const getUserValidationSchema = Joi.object().keys({
  username: Joi.string().required()
});

export const validateGetUserRequest = (req, res, next) => {
  if (!req.params) {
    return res.boom.badRequest('Username value is missing');
  }

  const { error } = getUserValidationSchema.validate(req.params);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const addUserValidationSchema = Joi.object().keys({
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

export const validateAddUserRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }
  const { error } = addUserValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const userUpdateValidationSchema = Joi.object().keys({
  _id: Joi.string().required(),
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

export const validateUpdateUserRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }

  const { error } = userUpdateValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const deleteUserValidationSchema = Joi.object().keys({
  _id: Joi.string().required()
});

export const validateDeleteUserRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User Id is required');
  }

  const { error } = deleteUserValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};
