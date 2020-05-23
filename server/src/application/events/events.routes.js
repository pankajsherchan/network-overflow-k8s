import express from 'express';
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
router.put('/:id', validateUpdateEventRequest, eventController.updateEvent);
router.post('/', validateAddEventRequest, eventController.addEvent);
router.delete('/:id', validateDeleteEventRequest, eventController.deleteEvent);

export default router;
