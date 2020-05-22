import httpStatusCodes from 'http-status-codes';
import AppError from '../application/error/appError';
import { APIFeatures, logger } from '../utils';

export const addOne = async (Model, value) => {
  logger.info('add one');
  try {
    const doc = await Model.create(value);

    return {
      data: doc,
      httpStatus: httpStatusCodes.OK
    };
  } catch (error) {
    throw new AppError(
      'Something went wrong. Could not add the document.Please try again',
      httpStatusCodes.BAD_REQUEST
    );
  }
};

export const updateOne = async (Model, id, updated) => {
  logger.info('update one');
  try {
    const doc = await Model.findByIdAndUpdate(id, updated, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      throw new AppError(`Could not find document with id ${id}`, httpStatusCodes.BAD_REQUEST);
    }

    return {
      data: updated,
      httpStatus: httpStatusCodes.OK
    };
  } catch (err) {
    throw new AppError('Update failed. Please try again', httpStatusCodes.BAD_REQUEST);
  }
};

export const deleteOne = async (Model, id) => {
  logger.info('delete one');
  try {
    const deletedEntity = await Model.findByIdAndDelete(id);

    return {
      data: deletedEntity,
      httpStatus: httpStatusCodes.OK
    };
  } catch (err) {
    throw new AppError(`Could not find document with id ${id}`, httpStatusCodes.BAD_REQUEST);
  }
};

export const getOne = async (Model, id, populateOptions) => {
  logger.info('get one');
  try {
    let query = Model.findById(id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      throw new AppError(`Could not find document with id ${id}`, httpStatusCodes.BAD_REQUEST);
    }

    return {
      data: doc,
      httpStatus: httpStatusCodes.OK
    };
  } catch (error) {
    throw new AppError('Something went wrong. Please try again', httpStatusCodes.BAD_REQUEST);
  }
};

export const getAll = async (Model, reqQuery) => {
  logger.info('get all');

  try {
    const features = new APIFeatures(Model.find(), reqQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    return {
      data: await features.query,
      httpStatus: httpStatusCodes.OK
    };
  } catch (error) {
    throw new AppError('Could not get documents', httpStatusCodes.BAD_REQUEST);
  }
};
