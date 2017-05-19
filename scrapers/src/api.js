import request from 'request';

import log from 'lib/logger';

const API_URL = process.env.API_URL;

class API {
  constructor() {
    this.API_URL = process.env.API_URL;
    this.API_KEY = process.env.API_KEY;
  }

  sendRequest(url, method = 'GET', data) {
    const headers = { authorization: this.API_KEY };
    return new Promise((resolve, reject) => {
      request(url, { headers, method: method, json: data }, (error, response, body) => {
        if (error && response.statusCode.charAt(0) === 4) {
          reject(error);
          log.error(`HTTP ${method} to ${url} have error - ${error}`);
        }

        if (response.statusCode === 200 || response.statusCode === 302) {
          log.info(`HTTP ${method} to ${url} return back with status 200`);
          resolve(body);
        }



      })
    })
  }

  saveSong(data) {
    return this.sendRequest(`${this.API_URL}/saveSong`, 'POST', data);
  }
}

export default new API();
