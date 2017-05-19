import request from 'request';

const providers = {
	facebook: {
		url: 'https://graph.facebook.com/me'
	}
}

export default function validateWithProvider(network, socialToken) {
	return new Promise((resolve, reject) => {
		request({
			url: providers[network].url,
			qs: { access_token: socialToken },
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				resolve(JSON.parse(body));
			} else {
				reject(error);
			}
		})
	})
};
