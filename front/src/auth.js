import hello from 'hellojs';
import request from 'request';

let socialToken;
let serverToken;

hello.init({
  facebook: process.env.FACEBOOK_CLIENTID,
  google: process.env.GOOGLE_CLIENTID,
}, {
  redirect_uri: '/'
})

hello.on('auth.login', (auth) => {
  socialToken = auth.authResponse.access_token;

    // Auth with our own server using the social token
    authenticate(auth.network, socialToken).then(function (token) {
        console.log(token);
        serverToken = token;
    });
});

export default function authenticate(network, socialToken) {
    const url = `${process.env.API_URL}/auth/login`;
    const options = {
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
      }
    }

    let data = {
      network: network,
      socialToken: socialToken,
    }

    data = JSON.stringify(data);

    return new Promise(function (resolve, reject) {
      console.log(url);
      request({ url: url, method: 'POST', body: data, headers: options.headers }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log(res);
          resolve(res);
        }
      })
    })
}

