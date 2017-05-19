import cheerio from 'cheerio';

import colog from 'lib/consoleAndLogger';
import writeFile from 'lib/write-file';

export default function scrapeList(list) {
  const $ = cheerio.load(list);
  const songs = $('a.result_text');
  let results = [];

  for (let index = 0; index < songs.length; index++) {
    results.push($(songs[index]).attr('href'));
  }

  if (results.length) {
    colog(`karaoke/scrapeFavorites - finish scrape songs`, 'info', 'green');
    return results;
  }
}
