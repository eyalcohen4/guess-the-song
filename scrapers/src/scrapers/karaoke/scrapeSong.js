import api from 'api';
import cheerio from 'cheerio';

import colog from 'lib/consoleAndLogger';
import { getSongPage } from 'scrapers/karaoke/karaoke';

export default function scrapeSongPage(url) {
  return new Promise((resolve, reject) => {
    api.sendRequest(url).then(page => {
      const $ = cheerio.load(page);
      const song = $('a.lyrics').attr('href');

      if (song) {
        colog(`karaoke/scrapeSongPage - finish song page`, 'info', 'green');
        resolve(song);
      }
    });
  })
}

