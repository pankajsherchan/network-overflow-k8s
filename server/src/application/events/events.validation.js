import Joi from '@hapi/joi';
import { logger } from '../../utils';

const getEventValidationSchema = Joi.object().keys({
  id: Joi.string().required()
});

export const validateGetEventRequest = (req, res, next) => {
  if (!req.params) {
    return res.boom.badRequest('Id value is missing');
  }

  const { error } = getEventValidationSchema.validate(req.params);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const eventAddEventValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.string(),
  imageCover: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  createdDate: Joi.date().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.number().required(),
  country: Joi.string().required(),
  description: Joi.string()
});

export const validateAddEventRequest = (req, res, next) => {
  logger.info('Events Add Validation');
  if (!req.body) {
    return res.boom.badRequest('Event data is required');
  }

  const { error } = eventAddEventValidationSchema.validate(req.body);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const eventUpdateEventValidationSchema = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.string().required()
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    type: Joi.string(),
    imageCover: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    createdDate: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.number().required(),
    country: Joi.string().required()
  })
});

export const validateUpdateEventRequest = (req, res, next) => {
  if (!req.body || !req.params) {
    return res.boom.badRequest('Data is missing');
  }

  const formatReq = {
    params: req.params,
    body: req.body
  };
  const { error } = eventUpdateEventValidationSchema.validate(formatReq);
  console.log('error: ', error);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};

export const eventDeleteEventValidationSchema = Joi.object().keys({
  id: Joi.string().required()
});

export const validateDeleteEventRequest = (req, res, next) => {
  if (!req.params) {
    return res.boom.badRequest('Id is required');
  }

  const { error } = eventDeleteEventValidationSchema.validate(req.params);

  if (error) {
    return res.boom.badData(error.message);
  }

  next();
};
