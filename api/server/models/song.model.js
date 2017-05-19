import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const SongSchema = new mongoose.Schema({
	lyrics: { type: String, required: true },
	name: { type: String, required: true },
	artist: { type: String, ref: 'Artist', unique: false, required: true },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
SongSchema.method({
});

/**
 * Statics
 */
SongSchema.statics = {

	getByName(name) {
	  return this.find({ name })
	  .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('Song', SongSchema);
