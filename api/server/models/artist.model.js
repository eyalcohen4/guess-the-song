import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Artist Schema
 */
const ArtistSchema = new mongoose.Schema({
	name: { type: String, required: true },
	gender: { type: String, required: false },
	genre: { type: String, required: false },
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
ArtistSchema.method({
	/**
	 * @description
	 * When we insert artist, we dont want to make duplicate
	 * objects for the same artist, so we check by the name
	 * if he already exists.
	 *
	 * @param {String} name - the artist name
	 * @return {Boolean}
	 */
	isExists(name) {
		this.find({ name: name})
		.exec()
		.then(artist => {
			if (artist) {
				return true;
			}
			return false;
		});
	}
});

/**
 * Statics
 */
ArtistSchema.statics = {
	/**
	 * @description
	 * When we insert artist, we dont want to make duplicate
	 * objects for the same artist, so we check by the name
	 * if he already exists.
	 *
	 * @param {String} name - the artist name
	 * @return {Boolean}
	 */
	getByName(name) {
	  return this.find({ name })
	  .exec()
	  .then((artist) => {
		  if (artist) {
			  return artist;
		  }

		  return Promise.reject(false);
	  });
  }
};

/**
 * @typedef Artist
 */
export default mongoose.model('Artist', ArtistSchema);
