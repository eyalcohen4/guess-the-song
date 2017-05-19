import jwt from 'jsonwebtoken';

export default function createJWT(profile) {
	return jwt.sign(profile, process.env.JWT_SECRET, {
		expiresIn: '5h',
		issuer: 'MY_APP'
	})
}
