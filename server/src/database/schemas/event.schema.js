import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Event must have title']
  },
  type: {
    type: String,
    required: [true, 'Event must have type']
  },
  category: {
    type: String,
    required: [true, 'Event must have category']
  },
  hashtags: {
    type: String
  },
  organizer: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Event must have description']
  },
  address1: {
    type: String,
    required: [true, 'Event must have address1']
  },
  address2: {
    type: String
  },
  city: {
    type: String,
    required: [true, 'Event must have city']
  },
  state: {
    type: String,
    required: [true, 'Event must have state']
  },
  zipCode: {
    type: Number,
    required: [true, 'Event must have zipCode']
  },
  country: {
    type: String,
    required: [true, 'Event must have country']
  },
  date: {
    type: Date,
    required: [true, 'Event must have date']
  },
  startTime: {
    type: String,
    required: [true, 'Event must have start time']
  },
  endTime: {
    type: String,
    required: [true, 'Event must have end time']
  },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

const Event = mongoose.model('Event', EventSchema);

// EventSchema.pre('save', async next => {
//   const attendeesPromise = this.attendees.map(async id => await User.findById(id));
//   this.attendees = await Promise.all(attendeesPromise);
//   next();
// });

EventSchema.pre('/^find/', next => {
  this.populate('attendees');
  next();
});

export default Event;
