import Event from '../database/schemas/event.schema';
import { addOne, deleteOne, getAll, getOne, updateOne } from './serviceHelper';

export const getEvents = async reqQuery => await getAll(Event, reqQuery);

export const getEvent = async id => await getOne(Event, id, { path: 'attendees' });

export const addEvent = async event => await addOne(Event, event);

export const updateEvent = async (id, event) => await updateOne(Event, id, event);

export const deleteEvent = async id => deleteOne(Event, id);
