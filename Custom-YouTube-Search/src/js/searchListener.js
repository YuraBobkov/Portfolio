import {req} from './reqSearch.js';

export     function searchListener(search, resultDiv, pages, obj) {
    search.addEventListener('keydown', function(e) {
        if(e.keyCode === 13) {
            resultDiv.innerHTML = '';
            resultDiv.style.transform = 'translateX(0px)';
            pages.innerHTML = '';
            obj.numberOfPages = 0;
            obj.countResult = 0;
            obj.currentPage = 1;
            obj.nextPageToken = '';
            obj = req(pages, resultDiv, search, obj);
        }
    });
    document.querySelector('#search-btn').addEventListener('click', function(e) {
        resultDiv.innerHTML = '';
        resultDiv.style.transform = 'translateX(0px)';
        pages.innerHTML = '';
        obj.numberOfPages = 0;
        obj.countResult = 0;
        obj.currentPage = 1;
        obj.nextPageToken = '';
        obj = req(pages, resultDiv, search, obj);
    });
    return obj;
}
