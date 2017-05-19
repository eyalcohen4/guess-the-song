import fs from 'fs';
import colors from 'colors';

export default function writeFile(file, type) {
  fs.writeFile(`response.${type}`, file, error => {

    if (error) {
        console.error(error.red);
        return;
    }

    console.log(`response.html is saved`.green);
  });
}
