import {req} from './reqSearch.js';

export    function changePage(number, pages, resultDiv, search, obj) {
    pages.childNodes[obj.currentPage - 1].classList.add('active');
    resultDiv.style.transform = `translateX(-${obj.offsetWrapper*(number - 1)}px)`;
    if(number % 3 === 0 && number + 3 > obj.numberOfPages || number === obj.numberOfPages) {
        req(pages, resultDiv, search, obj);
    }
}
