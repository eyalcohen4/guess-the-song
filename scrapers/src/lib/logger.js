import fs from 'fs';
import path from 'path';
import Log from 'log';
const directory = path.resolve(__dirname, '../log');

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

export default new Log('debug', fs.createWriteStream(path.resolve(__dirname, '../log/log.log')));
