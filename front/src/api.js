import request from 'request';

class API {
    constructor() {
        this.BASE_URL = process.env.API_URL;
        this.sendRequest = this.sendRequest.bind(this);
        this.getLevel = this.getLevel.bind(this);
    }

    sendRequest(url) {
        return new Promise((resolve, reject) => {
            request(`${this.BASE_URL}/${url}`, (error, response, body) => {
                if(!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    }

    getLevel() {
        return this.sendRequest('GetLevel').then(response => { return JSON.parse(response) }, error => { return error });
    }

    register() {

    }
}

export default new API();

