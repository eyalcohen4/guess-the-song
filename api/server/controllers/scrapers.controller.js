import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

import Song from '../models/song.model';
import Artist from '../models/artist.model';
import User from '../models/user.model';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import log from '../../config/logger';

/**
 * Return the status of create new song at db
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function saveSong(req, res, next) {
	log.info('scrapers.controller - Save song request');
	if (!req.headers.authorization && req.headers.authorization !== process.env.SCRAPERS_KEY) {
		log.info('scrapers.controller - Save song request - Unauthorize, return 401 and end connection');
    	return res.status(401).end();
    }

	const artist = req.body.artist;
	const lyrics = req.body.lyrics;
	const name 	 = req.body.name;

	/**
	 * Check if artist/song exists in db,
	 * yes - return and send response
	 * no - create new artist/song
	 */
	Artist.find({ name: artist }).then(results => {
		if (!results.length) {
			const instance = new Artist({ name: artist });
			instance.save((error) => {
				if (!error) {
					log.info(`scrapers.controller - saveSong - Artist ${artist} has saved successfully`);
				} else {
					log.error(`scrapers.controller - saveSong - Mongo error while save Artist ${error}`);
				}
			})
		}

		log.info(`scrapers.controller - saveSong - Artist ${artist} already exists`);
	})

	Song.find({ name }).then(results => {
		if (!results.length) {
			const instance = new Song({ name, lyrics, artist });
			instance.save((error) => {
				if (!error) {
					log.info(`Song ${name} saved successfully`);
					return res.status(200).json({ message: `Song ${name} saved successfully` });
				}

				log.error(`scrapers.controller - saveSong - Mongo error while save Artist ${error}`);
			})
		} else {
			return res.status(302).json({ message: `Song ${name} already exists` });
		}

	})
}

export default { saveSong };
