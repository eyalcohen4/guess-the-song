import colors from 'colors';
import log from './logger';

export default function conslog(message, type = 'info', color) {
  const consoleMessage = `--- \n ${message} \n ---`;

  switch (type) {
    case 'info':
      log.info(message);
      break;
    case 'debug':
      log.debug(message);
      break;
    case 'error':
      log.error(message);
      break;
    default:
      log.info(message);
  }

  switch (color) {
    case 'green':
      console.log(`${consoleMessage}`.green);
      break;
    case 'red':
      console.log(`${consoleMessage}`.red);
      break;
    case 'blue':
      console.log(`${consoleMessage}`.blue);
      break;
    default:
      console.log(consoleMessage);
  }
}
