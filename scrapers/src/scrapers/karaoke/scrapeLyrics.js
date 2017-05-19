import api from 'api';
import cheerio from 'cheerio';

import log from 'lib/logger';

export default function scrapeLyrics(url) {
  api.sendRequest(url).then(page => {
    const $ = cheerio.load(page);

    const songData = {
      name: $('.popup_song_title').text(),
      artist: $('.artist_title').text(),
      lyrics: $('.lyrics_text').text(),
    };

    api.saveSong(songData);
  });

}
