import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';
import createJWT from '../helpers/createJWT';
import validateWithProvider from '../helpers/hello';

import config from '../../config/config';
import log from '../../config/logger';

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
	let network = req.body.network;
	let socialToken = req.body.socialToken;

	validateWithProvider(network, socialToken).then((profile) => {
		res.status(200).send({ jwt: createJWT(profile), profile });
	}).catch((error) => { log.error(`auth.controller - login - ${error}`); res.status(500).send(error) })
}


/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
