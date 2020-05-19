import Joi from '@hapi/joi';

const getEventValidationSchema = Joi.object().keys({
  username: Joi.string().required()
});

export const validateGetEventRequest = (req, res, next) => {
  console.log(req.params);
  if (!req.params) {
    return res.boom.badRequest('Username value is missing');
  }

  const { error } = getEventValidationSchema.validate(req.params);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const eventAddEventValidationSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .required()
    .email(),
  username: Joi.string()
    .required()
    .min(3)
    .max(30)
});

export const validateAddEventRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }

  const { error } = eventAddEventValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const eventUpdateEventValidationSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .required()
    .email(),
  username: Joi.string()
    .required()
    .min(3)
    .max(30)
});

export const validateUpdateEventRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }

  const { error } = eventUpdateEventValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const eventDeleteEventValidationSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .required()
    .email(),
  username: Joi.string()
    .required()
    .min(3)
    .max(30)
});

export const validateDeleteEventRequest = (req, res, next) => {
  if (!req.body) {
    return res.boom.badRequest('User data is required');
  }

  const { error } = eventDeleteEventValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};
