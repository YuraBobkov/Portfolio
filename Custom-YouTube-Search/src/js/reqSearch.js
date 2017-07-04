import {viewResult} from './reqVideo.js';
import {changeNumberOfPages} from './changeNumberOfPages.js';

export  function req(pages, resultDiv, search, obj) {
    let url;
    if(obj.nextPageToken !== '') {
        url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC2qipgU3Gn-sNtBlXnmn4QvXD4STOJL3U&pageToken=${obj.nextPageToken}&type=video&part=snippet&maxResults=15&q=${search.value}`;
    } else {
        url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC2qipgU3Gn-sNtBlXnmn4QvXD4STOJL3U&type=video&part=snippet&maxResults=15&q=${search.value}`;
    }
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            const previousCount = obj.countResult;
            const previousNumberOfPages = obj.numberOfPages;
            obj.countResult = previousCount + data.items.length;
            obj.numberOfPages = Math.floor(obj.countResult / obj.resultPerPage);
            if(obj.nextPageToken === '' && obj.countResult === 0) {
                alert('No results');
            } else {
                obj.nextPageToken = data.nextPageToken;
                changeNumberOfPages(pages, previousNumberOfPages, obj.numberOfPages);
                pages.childNodes[obj.currentPage - 1].classList.add('active');
                data.items.forEach(function(item, i, arr) {
                    viewResult(item, previousCount + i, resultDiv);
                });
            }
        })
        .catch(error =>  console.log(JSON.stringify(error)))
    return obj;
}
