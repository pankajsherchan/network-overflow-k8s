import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event must have a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Event must have a price']
  },
  type: { type: String },
  imageCover: {
    type: String,
    required: [true, 'A event must have a cover image']
  },
  images: [String],
  createdDate: {
    type: Date,
    required: [true, 'Event must specify the created date']
  },

  street: {
    type: String,
    required: [true, 'A event must have street address']
  },
  city: {
    type: String,
    required: [true, 'A event must have city']
  },
  state: {
    type: String,
    required: [true, 'A event must have state']
  },
  zipCode: {
    type: String,
    required: [true, 'A event must have zip code']
  },
  country: {
    type: String,
    required: [true, 'A event must have country']
  },
  description: {
    type: String
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
