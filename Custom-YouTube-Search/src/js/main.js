import {searchForm, submitForm, search, wrapper, resultDiv, pages} from './elements.js';
import {searchListener} from './searchListener.js';
import {req} from './reqSearch.js';
import {pageListener} from './pageListener.js';
import {changePage} from './changePage.js';
import {swipe} from './swipeListener.js';
import {changeNumberOfPages} from './changeNumberOfPages.js';

window.onload = () => {
document.querySelector(".search").addEventListener("submit", function prevDef(e) {e.preventDefault();}, false);

    let obj = {
        currentPage: 1,
        countResult: 0,
        resultPerPage: 4,
        numberOfPages: 0,
        nextPageToken: '',
        chageForSwipe: 300,
        offsetWrapper: 1480
    };

    let sizeObj = {
        searchWidth: search.style.width,
        searchFormWidth: searchForm.style.width,
        wrapperWidth: wrapper.style.width
    };

    function resize() {
        if(window.innerWidth < 710 || screen.width < 710) {
            sizeObj.searchWidth = 250;
            sizeObj.searchFormWidth = 300;
            sizeObj.wrapperWidth = 320;
            obj.resultPerPage = 1;
            obj.chageForSwipe = 20;
            obj.offsetWrapper = 370;
        } else if(window.innerWidth < 1080 || screen.width < 1080) {
            sizeObj.searchWidth = 450;
            sizeObj.searchFormWidth = 500;
            sizeObj.wrapperWidth = 690;
            obj.resultPerPage = 2;
            obj.chageForSwipe = 80;
            obj.offsetWrapper = 740;
        } else if(window.innerWidth < 1450 || screen.width < 1450) {
            sizeObj.searchWidth = 550;
            sizeObj.searchFormWidth = 600;
            sizeObj.wrapperWidth = 1060;
            obj.resultPerPage = 3;
            obj.chageForSwipe = 170;
            obj.offsetWrapper = 1110;
        } else {
            sizeObj.searchWidth = 650;
            sizeObj.searchFormWidth = 700;
            sizeObj.wrapperWidth = 1430;
            obj.resultPerPage = 4;
            obj.chageForSwipe = 300;
            obj.offsetWrapper = 1480;
        }
        search.style.width = sizeObj.searchWidth + 'px';
        searchForm.style.width = sizeObj.searchFormWidth + 'px';
        wrapper.style.width = sizeObj.wrapperWidth + 'px';
    }

    resize();

    obj = searchListener(search, resultDiv, pages, obj);

    obj.currentPage = pageListener(pages, resultDiv, search, obj);

    swipe(wrapper, pages, resultDiv, search, obj);

    window.onresize = () => {
        const previousNumberOfPages = obj.numberOfPages;
        const currentResult = (obj.currentPage - 1) * obj.resultPerPage + 1;
        resize();
        obj.numberOfPages = Math.floor(obj.countResult / obj.resultPerPage);
        changeNumberOfPages(pages, previousNumberOfPages, obj.numberOfPages);
        pages.childNodes[obj.currentPage - 1].classList.remove('active');
        obj.currentPage = Math.ceil(currentResult / obj.resultPerPage);
        pages.childNodes[obj.currentPage - 1].classList.add('active');
    }
};
