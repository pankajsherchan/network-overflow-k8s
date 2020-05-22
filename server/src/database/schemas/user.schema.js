import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Firstname is required']
  },
  lastName: {
    type: String,
    required: [true, 'Lastname is required']
  },
  username: {
    type: String,
    required: true,
    unique: [true, 'Username is required']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: [true, 'Email is required']
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', UserSchema);

// virtual populates the events
UserSchema.virtual('events', {
  ref: 'Event',
  foreignField: 'attendees',
  localField: '_id'
});

export default User;
