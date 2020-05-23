import express from 'express';
import * as authenticationController from '../authentication';
import * as eventController from './events.controller';
import {
  validateAddEventRequest,
  validateDeleteEventRequest,
  validateGetEventRequest,
  validateUpdateEventRequest
} from './events.validation';

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/:id', validateGetEventRequest, eventController.getEvent);
router.put(
  '/:id',
  authenticationController.extractAndVerifyToken,
  validateUpdateEventRequest,
  eventController.updateEvent
);
router.post(
  '/',
  authenticationController.extractAndVerifyToken,
  validateAddEventRequest,
  eventController.addEvent
);
router.delete(
  '/:id',
  authenticationController.extractAndVerifyToken,
  validateDeleteEventRequest,
  eventController.deleteEvent
);

export default router;
