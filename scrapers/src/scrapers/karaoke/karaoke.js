import api from 'api';
import scrapeList from 'scrapers/karaoke/scrapeList';
import scrapeSongPage from 'scrapers/karaoke/scrapeSong';
import scrapeLyricsPage from 'scrapers/karaoke/scrapeLyrics';

const FAVORITE_LIST_URL = 'https://www.karaoke.co.il/searchresults.php?catid=cat22';

async function getList() {
  const list = api.sendRequest(FAVORITE_LIST_URL);
  return await list;
}

async function getSongPage(url) {
 const songPage = api.sendRequest(url);
 return await songPage;
}

async function initList() {
 const list = getList().then(scrapeList);
 return await list;
}


async function init() {
  const urls = await initList();

  for (let url of urls) {
    scrapeSongPage(url).then(song => {
      scrapeLyricsPage(song);
    });
  }

}

export default init;
