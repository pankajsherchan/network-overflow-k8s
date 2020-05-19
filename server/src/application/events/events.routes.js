import express from 'express';
import * as eventController from './events.controller';
import {
  validateAddEventRequest,
  validateDeleteEventRequest,
  validateGetEventRequest,
  validateUpdateEventRequest
} from './events.validation';

const router = express.Router();

router.put('/', validateUpdateEventRequest, eventController.updateEvent);
router.get('/', validateGetEventRequest, eventController.getEvents);
router.post('/', validateAddEventRequest, eventController.addEvent);
router.delete('/', validateDeleteEventRequest, eventController.deleteEvent);

export default router;
