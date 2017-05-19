import passport from 'passport';
import { Strategy as facebookStrategy } from 'passport-facebook';

import APIError from '../server/helpers/APIError';
import User from '../server/models/user.model';


export default {
	facebook: passport.use(new facebookStrategy({
		clientID: process.env.FACEBOOK_CLIENTID,
		clientSecret: process.env.FACEBOOK_SECRET,
		callbackURL: process.env.FACEBOOK_CALLBACK,
	}, (token, refreshToken, profile, done) => {
		process.nextTick(() => {
			User.findOne({ 'facebook.id': profile.id }, (error, user) => {
				if (error) {
					return error;
				}

				if (user) {
					return done(null, user);
				} else {
					const instance = new User();

					instance.facebook.id 	= profile.id;
					instance.facebook.token = token;
					instance.facebook.name  = `${profile.name.givenName}${profile.name.familyName}`;
					instance.facebook.email = profile.emails[0].value;

					instance.save((error) => {
						if (error) {
							new APIError(error);
							return;
						}

						return done(null, instance);
					})
				}
			})
		})
	})),
}
