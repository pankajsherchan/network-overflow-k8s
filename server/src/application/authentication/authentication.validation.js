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

export const validateSignupRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }

  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const loginValidationSchema = Joi.alternatives().try(
  Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .error(
        new Error({
          message: 'Username is required.'
        })
      ),
    email: Joi.string()
      .email()
      .optional(),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$' // 1 capital letter, 1 small letter, 1 number, 1 special character, minimum 6 character long
        )
      )
  }),
  Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(30)
      .optional(),
    email: Joi.string()
      .email()
      .required()
      .error(
        new Error({
          message: 'Email is required.'
        })
      ),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$' // 1 capital letter, 1 small letter, 1 number, 1 special character, minimum 6 character long
        )
      )
  })
);

export const forgotPasswordValidationSchema = Joi.alternatives().try(
  Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
  })
);

export const validateLoginRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }

  const { error } = loginValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const forgotPasswordRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }

  const { error } = forgotPasswordValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const changePasswordValidationSchema = Joi.object().keys({
  email: Joi.string()
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

export const validateChangePasswordRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('Email or Password is missing');
  }

  const { error } = changePasswordValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};
