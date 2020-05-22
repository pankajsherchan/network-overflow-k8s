import { eventService } from '../../services';
import { catchAsync, logger } from '../../utils';

export const getEvent = catchAsync(async (req, res, next) => {
  logger.info('EventController - GetEvent');
  res.send(await eventService.getEvent(req.params.id));
});

export const getEvents = catchAsync(async (req, res, next) => {
  logger.info('EventController - GetEvent');
  res.send(await eventService.getEvents(req.query));
});

export const addEvent = () =>
  catchAsync(async (req, res, next) => {
    logger.info('EventController - AddEvent');
    res.send(await eventService.addEvent(req.body));
  });

export const updateEvent = () =>
  catchAsync(async (req, res, next) => {
    logger.info('EventController - UpdateEvent');
    res.send(await eventService.updateEvent(req.params.id, req.body));
  });

export const deleteEvent = () =>
  catchAsync(async (req, res, next) => {
    logger.info('EventController - DeleteEvent');
    res.send(await eventService.deleteEvent(req.params.id));
  });
