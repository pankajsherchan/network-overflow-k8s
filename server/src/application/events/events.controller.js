import multer from 'multer';
import sharp from 'sharp';
import * as eventService from '../../services';
import { catchAsync, logger } from '../../utils';
import AppError from '../error/appError';

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/image/events');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `event-${Date.now()}.${ext}`);
//   }
// });

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadEventImage = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 4 }
]);

export const resizeImages = async (req, res, next) => {
  if (!req.files) {
    next();
  }

  const coverImageName = `events-${Date.now()}-${req.files.imageCover[0].originalname}`;

  await sharp(req.files.imageCover[0].buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/image/events/${coverImageName}`);

  req.body.imageCover = coverImageName;

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async image => {
      const imageName = `events-${Date.now()}-${image.originalname}`;

      await sharp(image.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/image/events/${imageName}`);

      req.body.images.push(imageName);
    })
  );

  next();
};

export const getEvent = catchAsync(async (req, res, next) => {
  logger.info('EventController - GetEvent');
  res.send(await eventService.getEvent(req.params.id));
});

export const getEvents = catchAsync(async (req, res, next) => {
  logger.info('EventController - GetEvent');
  res.send(await eventService.getEvents(req.query));
});

export const addEvent = catchAsync(async (req, res, next) => {
  logger.info('EventController - AddEvent');
  res.send(await eventService.addEvent(req.body));
});

export const updateEvent = catchAsync(async (req, res, next) => {
  logger.info('EventController - UpdateEvent');
  res.send(await eventService.updateEvent(req.params.id, req.body));
});

export const deleteEvent = catchAsync(async (req, res, next) => {
  logger.info('EventController - DeleteEvent');
  res.send(await eventService.deleteEvent(req.params.id));
});
