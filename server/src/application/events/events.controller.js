import httpStatusCodes from 'http-status-codes';
import Event from '../../database/schemas/event.schema';
import catchAsync from '../../utils/catchAsync';
import { logger } from '../../utils/logger';
import checkResponse from '../../utils/responseHandler';
import AppError from '../error/appError';

export const getEvent = catchAsync(async (req, res, next) => {
  logger.info('EventController - GetEvent');

  const eventResponse = await Event.findById(req.params.id).populate('attendees');

  if (!checkResponse(eventResponse)) {
    return next(new AppError('No event with that ID is found', httpStatusCodes.BAD_REQUEST));
  }

  res.send(eventResponse);
});
export const addEvent = () => null;
export const updateEvent = () => null;
export const deleteEvent = () => null;
