/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changePage = changePage;

var _reqSearch = __webpack_require__(1);

function changePage(number, pages, resultDiv, search, obj) {
    pages.childNodes[obj.currentPage - 1].classList.add('active');
    resultDiv.style.transform = 'translateX(-' + obj.offsetWrapper * (number - 1) + 'px)';
    if (number % 3 === 0 && number + 3 > obj.numberOfPages || number === obj.numberOfPages) {
        (0, _reqSearch.req)(pages, resultDiv, search, obj);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.req = req;

var _reqVideo = __webpack_require__(8);

var _changeNumberOfPages = __webpack_require__(2);

function req(pages, resultDiv, search, obj) {
    var url = void 0;
    if (obj.nextPageToken !== '') {
        url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyC2qipgU3Gn-sNtBlXnmn4QvXD4STOJL3U&pageToken=' + obj.nextPageToken + '&type=video&part=snippet&maxResults=15&q=' + search.value;
    } else {
        url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyC2qipgU3Gn-sNtBlXnmn4QvXD4STOJL3U&type=video&part=snippet&maxResults=15&q=' + search.value;
    }
    fetch(url).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        var previousCount = obj.countResult;
        var previousNumberOfPages = obj.numberOfPages;
        obj.countResult = previousCount + data.items.length;
        obj.numberOfPages = Math.floor(obj.countResult / obj.resultPerPage);
        if (obj.nextPageToken === '' && obj.countResult === 0) {
            alert('No results');
        } else {
            obj.nextPageToken = data.nextPageToken;
            (0, _changeNumberOfPages.changeNumberOfPages)(pages, previousNumberOfPages, obj.numberOfPages);
            pages.childNodes[obj.currentPage - 1].classList.add('active');
            data.items.forEach(function (item, i, arr) {
                (0, _reqVideo.viewResult)(item, previousCount + i, resultDiv);
            });
        }
    }).catch(function (error) {
        return console.log(JSON.stringify(error));
    });
    return obj;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeNumberOfPages = changeNumberOfPages;
function changeNumberOfPages(pages, previousNumberOfPages, numberOfPages) {
    if (numberOfPages > previousNumberOfPages) {
        for (var i = previousNumberOfPages; i < numberOfPages; i++) {
            pages.innerHTML += "<button class=\"page\">" + (i + 1) + "</button>";
        }
    } else if (numberOfPages < previousNumberOfPages) {
        for (var _i = previousNumberOfPages - 1; _i >= numberOfPages; _i--) {
            pages.childNodes[_i].remove();
        }
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var searchForm = exports.searchForm = document.createElement('form');
searchForm.className = 'search';
document.body.appendChild(searchForm);
var submitForm = exports.submitForm = document.createElement('button');
submitForm.setAttribute('type', 'submit');
submitForm.setAttribute('name', 'search-btn');
submitForm.setAttribute('id', 'search-btn');
submitForm.setAttribute('value', '');
searchForm.appendChild(submitForm);
var search = exports.search = document.createElement('input');
search.setAttribute('id', 'stringSearch');
search.setAttribute('type', 'search');
search.setAttribute('placeholder', 'Search');
searchForm.appendChild(search);
var wrapper = exports.wrapper = document.createElement('div');
wrapper.setAttribute('id', 'wrapper');
document.body.appendChild(wrapper);
var resultDiv = exports.resultDiv = document.createElement('div');
resultDiv.setAttribute('id', 'result');
wrapper.appendChild(resultDiv);
var pages = exports.pages = document.createElement('div');
pages.setAttribute('id', 'pages');
document.body.appendChild(pages);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pageListener = pageListener;

var _changePage = __webpack_require__(0);

function pageListener(pages, resultDiv, search, obj) {
    pages.addEventListener('click', function (e) {
        if (e.target.classList.contains('page')) {
            pages.childNodes[obj.currentPage - 1].classList.remove('active');
            obj.currentPage = parseInt(e.target.innerHTML, 10);
            (0, _changePage.changePage)(obj.currentPage, pages, resultDiv, search, obj);
        }
    });
    return obj.currentPage;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchListener = searchListener;

var _reqSearch = __webpack_require__(1);

function searchListener(search, resultDiv, pages, obj) {
    search.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            resultDiv.innerHTML = '';
            resultDiv.style.transform = 'translateX(0px)';
            pages.innerHTML = '';
            obj.numberOfPages = 0;
            obj.countResult = 0;
            obj.currentPage = 1;
            obj.nextPageToken = '';
            obj = (0, _reqSearch.req)(pages, resultDiv, search, obj);
        }
    });
    document.querySelector('#search-btn').addEventListener('click', function (e) {
        resultDiv.innerHTML = '';
        resultDiv.style.transform = 'translateX(0px)';
        pages.innerHTML = '';
        obj.numberOfPages = 0;
        obj.countResult = 0;
        obj.currentPage = 1;
        obj.nextPageToken = '';
        obj = (0, _reqSearch.req)(pages, resultDiv, search, obj);
    });
    return obj;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.swipe = undefined;

var _changePage = __webpack_require__(0);

function swipe(wrapper, pages, resultDiv, search, obj) {
    var resultDivPostionX = 0,
        mousedownX = 0;

    var moveHandler = function moveHandler(e) {
        var clientX = e.clientX || (e.touches.length ? e.touches[0].clientX : null);
        resultDiv.style.transform = 'translateX(' + (parseInt(resultDiv.style.transform.slice(11, -1), 10) + (e.clientX - mousedownX)) + 'px)';
        mousedownX = clientX;
    };

    var mouseUpHandler = function mouseUpHandler(e) {
        pages.childNodes[obj.currentPage - 1].classList.remove('active');
        resultDiv.style.transition = 'transform 0.5s';
        var changePosition = resultDivPostionX - parseInt(resultDiv.style.transform.slice(11, -1), 10);
        if (changePosition > obj.chageForSwipe) {
            obj.currentPage++;
        } else if (changePosition < -obj.chageForSwipe) {
            if (obj.currentPage > 1) {
                obj.currentPage--;
            }
        }
        (0, _changePage.changePage)(obj.currentPage, pages, resultDiv, search, obj);
        mousedownX = 0;
        wrapper.removeEventListener('mousemove', moveHandler);
        wrapper.removeEventListener('mouseup', mouseUpHandler);
    };

    wrapper.addEventListener('mousedown', function (e) {
        mousedownX = e.clientX;
        resultDivPostionX = parseInt(resultDiv.style.transform.slice(11, -1));
        resultDiv.style.transition = 'transform .1s';
        wrapper.addEventListener('mousemove', moveHandler);
        wrapper.addEventListener('mouseup', mouseUpHandler);
    });

    wrapper.addEventListener('touchstart', function (e) {
        mousedownX = e.touches[0].clientX;
        resultDivPostionX = parseInt(resultDiv.style.transform.slice(11, -1));
        resultDiv.style.transition = 'transform .1s';
        wrapper.addEventListener('touchmove', moveHandler);
        wrapper.addEventListener('touchend', mouseUpHandler);
    });
}

exports.swipe = swipe;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _elements = __webpack_require__(3);

var _searchListener = __webpack_require__(5);

var _reqSearch = __webpack_require__(1);

var _pageListener = __webpack_require__(4);

var _changePage = __webpack_require__(0);

var _swipeListener = __webpack_require__(6);

var _changeNumberOfPages = __webpack_require__(2);

window.onload = function () {
    document.querySelector(".search").addEventListener("submit", function prevDef(e) {
        e.preventDefault();
    }, false);

    var obj = {
        currentPage: 1,
        countResult: 0,
        resultPerPage: 4,
        numberOfPages: 0,
        nextPageToken: '',
        chageForSwipe: 300,
        offsetWrapper: 1480
    };

    var sizeObj = {
        searchWidth: _elements.search.style.width,
        searchFormWidth: _elements.searchForm.style.width,
        wrapperWidth: _elements.wrapper.style.width
    };

    function resize() {
        if (window.innerWidth < 710 || screen.width < 710) {
            sizeObj.searchWidth = 250;
            sizeObj.searchFormWidth = 300;
            sizeObj.wrapperWidth = 320;
            obj.resultPerPage = 1;
            obj.chageForSwipe = 20;
            obj.offsetWrapper = 370;
        } else if (window.innerWidth < 1080 || screen.width < 1080) {
            sizeObj.searchWidth = 450;
            sizeObj.searchFormWidth = 500;
            sizeObj.wrapperWidth = 690;
            obj.resultPerPage = 2;
            obj.chageForSwipe = 80;
            obj.offsetWrapper = 740;
        } else if (window.innerWidth < 1450 || screen.width < 1450) {
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
        _elements.search.style.width = sizeObj.searchWidth + 'px';
        _elements.searchForm.style.width = sizeObj.searchFormWidth + 'px';
        _elements.wrapper.style.width = sizeObj.wrapperWidth + 'px';
    }

    resize();

    obj = (0, _searchListener.searchListener)(_elements.search, _elements.resultDiv, _elements.pages, obj);

    obj.currentPage = (0, _pageListener.pageListener)(_elements.pages, _elements.resultDiv, _elements.search, obj);

    (0, _swipeListener.swipe)(_elements.wrapper, _elements.pages, _elements.resultDiv, _elements.search, obj);

    window.onresize = function () {
        var previousNumberOfPages = obj.numberOfPages;
        var currentResult = (obj.currentPage - 1) * obj.resultPerPage + 1;
        resize();
        obj.numberOfPages = Math.floor(obj.countResult / obj.resultPerPage);
        (0, _changeNumberOfPages.changeNumberOfPages)(_elements.pages, previousNumberOfPages, obj.numberOfPages);
        _elements.pages.childNodes[obj.currentPage - 1].classList.remove('active');
        obj.currentPage = Math.ceil(currentResult / obj.resultPerPage);
        _elements.pages.childNodes[obj.currentPage - 1].classList.add('active');
    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.viewResult = viewResult;
function viewResult(item, number, resultDiv) {
    var url = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC2qipgU3Gn-sNtBlXnmn4QvXD4STOJL3U&id=' + item.id.videoId + '&part=snippet,statistics';
    fetch(url).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        var figure = document.createElement('figure');
        var urlYoutube = 'https://www.youtube.com/watch?v=' + item.id.videoId;
        figure.innerHTML = '<a href=' + urlYoutube + ' class="title">' + data.items[0].snippet.title + '</a>\n                            <img src=' + data.items[0].snippet.thumbnails.medium.url + ' alt="preview image" />\n                            <figcaption class="information">\n                                    <span class="channel">' + data.items[0].snippet.channelTitle + '</span>\n                                    <span class="date">' + data.items[0].snippet.publishedAt.slice(0, 10) + '</span>\n                                    <span class="count">' + data.items[0].statistics.viewCount + '</span>\n                                    <p class="description">' + item.snippet.description + '</p>\n                            </figcaption>';
        figure.className = 'item ' + number;
        resultDiv.appendChild(figure);
        figure.style.transform = 'translateX(' + 370 * number + 'px)';
    }).catch(function (error) {
        return console.log(JSON.stringify(error));
    });
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU4NGI3YTM3Y2FjYzU4ZjMyZmYiLCJ3ZWJwYWNrOi8vLy4vanMvY2hhbmdlUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9yZXFTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2hhbmdlTnVtYmVyT2ZQYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYWdlTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNoTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc3dpcGVMaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL2pzL3JlcVZpZGVvLmpzIl0sIm5hbWVzIjpbImNoYW5nZVBhZ2UiLCJudW1iZXIiLCJwYWdlcyIsInJlc3VsdERpdiIsInNlYXJjaCIsIm9iaiIsImNoaWxkTm9kZXMiLCJjdXJyZW50UGFnZSIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwidHJhbnNmb3JtIiwib2Zmc2V0V3JhcHBlciIsIm51bWJlck9mUGFnZXMiLCJyZXEiLCJ1cmwiLCJuZXh0UGFnZVRva2VuIiwidmFsdWUiLCJmZXRjaCIsInRoZW4iLCJyZXNwIiwianNvbiIsImRhdGEiLCJwcmV2aW91c0NvdW50IiwiY291bnRSZXN1bHQiLCJwcmV2aW91c051bWJlck9mUGFnZXMiLCJpdGVtcyIsImxlbmd0aCIsIk1hdGgiLCJmbG9vciIsInJlc3VsdFBlclBhZ2UiLCJhbGVydCIsImZvckVhY2giLCJpdGVtIiwiaSIsImFyciIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvciIsImNoYW5nZU51bWJlck9mUGFnZXMiLCJpbm5lckhUTUwiLCJyZW1vdmUiLCJzZWFyY2hGb3JtIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3VibWl0Rm9ybSIsInNldEF0dHJpYnV0ZSIsIndyYXBwZXIiLCJwYWdlTGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwicGFyc2VJbnQiLCJzZWFyY2hMaXN0ZW5lciIsImtleUNvZGUiLCJxdWVyeVNlbGVjdG9yIiwic3dpcGUiLCJyZXN1bHREaXZQb3N0aW9uWCIsIm1vdXNlZG93blgiLCJtb3ZlSGFuZGxlciIsImNsaWVudFgiLCJ0b3VjaGVzIiwic2xpY2UiLCJtb3VzZVVwSGFuZGxlciIsInRyYW5zaXRpb24iLCJjaGFuZ2VQb3NpdGlvbiIsImNoYWdlRm9yU3dpcGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwid2luZG93Iiwib25sb2FkIiwicHJldkRlZiIsInByZXZlbnREZWZhdWx0Iiwic2l6ZU9iaiIsInNlYXJjaFdpZHRoIiwid2lkdGgiLCJzZWFyY2hGb3JtV2lkdGgiLCJ3cmFwcGVyV2lkdGgiLCJyZXNpemUiLCJpbm5lcldpZHRoIiwic2NyZWVuIiwib25yZXNpemUiLCJjdXJyZW50UmVzdWx0IiwiY2VpbCIsInZpZXdSZXN1bHQiLCJpZCIsInZpZGVvSWQiLCJmaWd1cmUiLCJ1cmxZb3V0dWJlIiwic25pcHBldCIsInRpdGxlIiwidGh1bWJuYWlscyIsIm1lZGl1bSIsImNoYW5uZWxUaXRsZSIsInB1Ymxpc2hlZEF0Iiwic3RhdGlzdGljcyIsInZpZXdDb3VudCIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7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LENBRVUsVUFBVUcsSUFBVixFQUFnQjtBQUNsQixZQUFNdUUsU0FBUy9DLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFlBQU0rQyxrREFBZ0Q3RCxLQUFLMEQsRUFBTCxDQUFRQyxPQUE5RDtBQUNBQyxlQUFPbEQsU0FBUCxnQkFBOEJtRCxVQUE5Qix1QkFBMER4RSxLQUFLSSxLQUFMLENBQVcsQ0FBWCxFQUFjcUUsT0FBZCxDQUFzQkMsS0FBaEYsbURBQzJCMUUsS0FBS0ksS0FBTCxDQUFXLENBQVgsRUFBY3FFLE9BQWQsQ0FBc0JFLFVBQXRCLENBQWlDQyxNQUFqQyxDQUF3Q25GLEdBRG5FLHlKQUdnRE8sS0FBS0ksS0FBTCxDQUFXLENBQVgsRUFBY3FFLE9BQWQsQ0FBc0JJLFlBSHRFLHdFQUk2QzdFLEtBQUtJLEtBQUwsQ0FBVyxDQUFYLEVBQWNxRSxPQUFkLENBQXNCSyxXQUF0QixDQUFrQy9CLEtBQWxDLENBQXdDLENBQXhDLEVBQTJDLEVBQTNDLENBSjdDLHlFQUs4Qy9DLEtBQUtJLEtBQUwsQ0FBVyxDQUFYLEVBQWMyRSxVQUFkLENBQXlCQyxTQUx2RSw0RUFNaURyRSxLQUFLOEQsT0FBTCxDQUFhUSxXQU45RDtBQVFBVixlQUFPN0MsU0FBUCxhQUEyQi9DLE1BQTNCO0FBQ0FFLGtCQUFVK0MsV0FBVixDQUFzQjJDLE1BQXRCO0FBQ0FBLGVBQU9uRixLQUFQLENBQWFDLFNBQWIsbUJBQXNDLE1BQU1WLE1BQTVDO0FBQ0gsS0FoQkwsRUFpQkttQyxLQWpCTCxDQWlCVztBQUFBLGVBQVVDLFFBQVFDLEdBQVIsQ0FBWUMsS0FBS0MsU0FBTCxDQUFlQyxLQUFmLENBQVosQ0FBVjtBQUFBLEtBakJYO0FBbUJILEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhZTg0YjdhMzdjYWNjNThmMzJmZiIsImltcG9ydCB7cmVxfSBmcm9tICcuL3JlcVNlYXJjaC5qcyc7XG5cbmV4cG9ydCAgICBmdW5jdGlvbiBjaGFuZ2VQYWdlKG51bWJlciwgcGFnZXMsIHJlc3VsdERpdiwgc2VhcmNoLCBvYmopIHtcbiAgICBwYWdlcy5jaGlsZE5vZGVzW29iai5jdXJyZW50UGFnZSAtIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIHJlc3VsdERpdi5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtvYmoub2Zmc2V0V3JhcHBlcioobnVtYmVyIC0gMSl9cHgpYDtcbiAgICBpZihudW1iZXIgJSAzID09PSAwICYmIG51bWJlciArIDMgPiBvYmoubnVtYmVyT2ZQYWdlcyB8fCBudW1iZXIgPT09IG9iai5udW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgIHJlcShwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2hhbmdlUGFnZS5qcyIsImltcG9ydCB7dmlld1Jlc3VsdH0gZnJvbSAnLi9yZXFWaWRlby5qcyc7XG5pbXBvcnQge2NoYW5nZU51bWJlck9mUGFnZXN9IGZyb20gJy4vY2hhbmdlTnVtYmVyT2ZQYWdlcy5qcyc7XG5cbmV4cG9ydCAgZnVuY3Rpb24gcmVxKHBhZ2VzLCByZXN1bHREaXYsIHNlYXJjaCwgb2JqKSB7XG4gICAgbGV0IHVybDtcbiAgICBpZihvYmoubmV4dFBhZ2VUb2tlbiAhPT0gJycpIHtcbiAgICAgICAgdXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvc2VhcmNoP2tleT1BSXphU3lDMnFpcGdVM0duLXNOdEJsWG5tbjRRdlhENFNUT0pMM1UmcGFnZVRva2VuPSR7b2JqLm5leHRQYWdlVG9rZW59JnR5cGU9dmlkZW8mcGFydD1zbmlwcGV0Jm1heFJlc3VsdHM9MTUmcT0ke3NlYXJjaC52YWx1ZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD9rZXk9QUl6YVN5QzJxaXBnVTNHbi1zTnRCbFhubW40UXZYRDRTVE9KTDNVJnR5cGU9dmlkZW8mcGFydD1zbmlwcGV0Jm1heFJlc3VsdHM9MTUmcT0ke3NlYXJjaC52YWx1ZX1gO1xuICAgIH1cbiAgICBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKChyZXNwKSA9PiByZXNwLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQ291bnQgPSBvYmouY291bnRSZXN1bHQ7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c051bWJlck9mUGFnZXMgPSBvYmoubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgICAgIG9iai5jb3VudFJlc3VsdCA9IHByZXZpb3VzQ291bnQgKyBkYXRhLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIG9iai5udW1iZXJPZlBhZ2VzID0gTWF0aC5mbG9vcihvYmouY291bnRSZXN1bHQgLyBvYmoucmVzdWx0UGVyUGFnZSk7XG4gICAgICAgICAgICBpZihvYmoubmV4dFBhZ2VUb2tlbiA9PT0gJycgJiYgb2JqLmNvdW50UmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ05vIHJlc3VsdHMnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqLm5leHRQYWdlVG9rZW4gPSBkYXRhLm5leHRQYWdlVG9rZW47XG4gICAgICAgICAgICAgICAgY2hhbmdlTnVtYmVyT2ZQYWdlcyhwYWdlcywgcHJldmlvdXNOdW1iZXJPZlBhZ2VzLCBvYmoubnVtYmVyT2ZQYWdlcyk7XG4gICAgICAgICAgICAgICAgcGFnZXMuY2hpbGROb2Rlc1tvYmouY3VycmVudFBhZ2UgLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBkYXRhLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSwgYXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdSZXN1bHQoaXRlbSwgcHJldmlvdXNDb3VudCArIGksIHJlc3VsdERpdik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKSlcbiAgICByZXR1cm4gb2JqO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcmVxU2VhcmNoLmpzIiwiZXhwb3J0ICAgICBmdW5jdGlvbiBjaGFuZ2VOdW1iZXJPZlBhZ2VzKHBhZ2VzLCBwcmV2aW91c051bWJlck9mUGFnZXMsIG51bWJlck9mUGFnZXMpIHtcbiAgICBpZiAobnVtYmVyT2ZQYWdlcyA+IHByZXZpb3VzTnVtYmVyT2ZQYWdlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gcHJldmlvdXNOdW1iZXJPZlBhZ2VzOyBpIDwgbnVtYmVyT2ZQYWdlczsgaSsrKSB7XG4gICAgICAgICAgICBwYWdlcy5pbm5lckhUTUwgKz0gYDxidXR0b24gY2xhc3M9XCJwYWdlXCI+JHtpICsgMX08L2J1dHRvbj5gO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChudW1iZXJPZlBhZ2VzIDwgcHJldmlvdXNOdW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBwcmV2aW91c051bWJlck9mUGFnZXMgLSAxOyBpID49IG51bWJlck9mUGFnZXM7IGktLSkge1xuICAgICAgICAgICAgcGFnZXMuY2hpbGROb2Rlc1tpXS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NoYW5nZU51bWJlck9mUGFnZXMuanMiLCJleHBvcnQgY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbnNlYXJjaEZvcm0uY2xhc3NOYW1lID0gJ3NlYXJjaCc7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlYXJjaEZvcm0pO1xuZXhwb3J0IGNvbnN0IHN1Ym1pdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbnN1Ym1pdEZvcm0uc2V0QXR0cmlidXRlKCd0eXBlJywnc3VibWl0Jyk7XG5zdWJtaXRGb3JtLnNldEF0dHJpYnV0ZSgnbmFtZScsJ3NlYXJjaC1idG4nKTtcbnN1Ym1pdEZvcm0uc2V0QXR0cmlidXRlKCdpZCcsJ3NlYXJjaC1idG4nKTtcbnN1Ym1pdEZvcm0uc2V0QXR0cmlidXRlKCd2YWx1ZScsJycpO1xuc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChzdWJtaXRGb3JtKTtcbmV4cG9ydCBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuc2VhcmNoLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RyaW5nU2VhcmNoJyk7XG5zZWFyY2guc2V0QXR0cmlidXRlKCd0eXBlJywgJ3NlYXJjaCcpO1xuc2VhcmNoLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnU2VhcmNoJyk7XG5zZWFyY2hGb3JtLmFwcGVuZENoaWxkKHNlYXJjaCk7XG5leHBvcnQgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xud3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dyYXBwZXInKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5leHBvcnQgY29uc3QgcmVzdWx0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5yZXN1bHREaXYuc2V0QXR0cmlidXRlKCdpZCcsICdyZXN1bHQnKTtcbndyYXBwZXIuYXBwZW5kQ2hpbGQocmVzdWx0RGl2KTtcbmV4cG9ydCBjb25zdCBwYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xucGFnZXMuc2V0QXR0cmlidXRlKCdpZCcsICdwYWdlcycpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYWdlcyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9lbGVtZW50cy5qcyIsImltcG9ydCB7Y2hhbmdlUGFnZX0gZnJvbSAnLi9jaGFuZ2VQYWdlLmpzJztcblxuZXhwb3J0ICBmdW5jdGlvbiBwYWdlTGlzdGVuZXIocGFnZXMsIHJlc3VsdERpdiwgc2VhcmNoLCBvYmopIHtcbiAgICBwYWdlcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYWdlJykpIHtcbiAgICAgICAgICAgIHBhZ2VzLmNoaWxkTm9kZXNbb2JqLmN1cnJlbnRQYWdlIC0gMV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBvYmouY3VycmVudFBhZ2UgPSBwYXJzZUludChlLnRhcmdldC5pbm5lckhUTUwsIDEwKTtcbiAgICAgICAgICAgIGNoYW5nZVBhZ2Uob2JqLmN1cnJlbnRQYWdlLCBwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb2JqLmN1cnJlbnRQYWdlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGFnZUxpc3RlbmVyLmpzIiwiaW1wb3J0IHtyZXF9IGZyb20gJy4vcmVxU2VhcmNoLmpzJztcblxuZXhwb3J0ICAgICBmdW5jdGlvbiBzZWFyY2hMaXN0ZW5lcihzZWFyY2gsIHJlc3VsdERpdiwgcGFnZXMsIG9iaikge1xuICAgIHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICByZXN1bHREaXYuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICByZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMHB4KSc7XG4gICAgICAgICAgICBwYWdlcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIG9iai5udW1iZXJPZlBhZ2VzID0gMDtcbiAgICAgICAgICAgIG9iai5jb3VudFJlc3VsdCA9IDA7XG4gICAgICAgICAgICBvYmouY3VycmVudFBhZ2UgPSAxO1xuICAgICAgICAgICAgb2JqLm5leHRQYWdlVG9rZW4gPSAnJztcbiAgICAgICAgICAgIG9iaiA9IHJlcShwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICByZXN1bHREaXYuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJlc3VsdERpdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwcHgpJztcbiAgICAgICAgcGFnZXMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG9iai5udW1iZXJPZlBhZ2VzID0gMDtcbiAgICAgICAgb2JqLmNvdW50UmVzdWx0ID0gMDtcbiAgICAgICAgb2JqLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgb2JqLm5leHRQYWdlVG9rZW4gPSAnJztcbiAgICAgICAgb2JqID0gcmVxKHBhZ2VzLCByZXN1bHREaXYsIHNlYXJjaCwgb2JqKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvc2VhcmNoTGlzdGVuZXIuanMiLCJpbXBvcnQge2NoYW5nZVBhZ2V9IGZyb20gJy4vY2hhbmdlUGFnZS5qcyc7XG5cbmZ1bmN0aW9uIHN3aXBlKHdyYXBwZXIsIHBhZ2VzLCByZXN1bHREaXYsIHNlYXJjaCwgb2JqKSB7XG4gICAgbGV0IHJlc3VsdERpdlBvc3Rpb25YID0gMCwgbW91c2Vkb3duWCA9IDA7XG5cbiAgICBjb25zdCBtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGNsaWVudFggPSBlLmNsaWVudFggfHwgKGUudG91Y2hlcy5sZW5ndGggPyBlLnRvdWNoZXNbMF0uY2xpZW50WCA6IG51bGwpO1xuICAgICAgICByZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtwYXJzZUludChyZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtLnNsaWNlKDExLCAtMSksIDEwKSArIChlLmNsaWVudFggIC0gbW91c2Vkb3duWCl9cHgpYDtcbiAgICAgICAgbW91c2Vkb3duWCA9IGNsaWVudFg7XG4gICAgfTtcblxuICAgIGNvbnN0IG1vdXNlVXBIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBwYWdlcy5jaGlsZE5vZGVzW29iai5jdXJyZW50UGFnZSAtIDFdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICByZXN1bHREaXYuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gMC41cyc7XG4gICAgICAgIGNvbnN0IGNoYW5nZVBvc2l0aW9uID0gcmVzdWx0RGl2UG9zdGlvblggLSBwYXJzZUludChyZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtLnNsaWNlKDExLCAtMSksIDEwKTtcbiAgICAgICAgaWYoY2hhbmdlUG9zaXRpb24gPiBvYmouY2hhZ2VGb3JTd2lwZSkge1xuICAgICAgICAgICAgb2JqLmN1cnJlbnRQYWdlKys7XG4gICAgICAgIH0gZWxzZSBpZihjaGFuZ2VQb3NpdGlvbiA8IC1vYmouY2hhZ2VGb3JTd2lwZSkge1xuICAgICAgICAgICAgaWYob2JqLmN1cnJlbnRQYWdlID4gMSkge1xuICAgICAgICAgICAgICAgIG9iai5jdXJyZW50UGFnZS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoYW5nZVBhZ2Uob2JqLmN1cnJlbnRQYWdlLCBwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaik7XG4gICAgICAgIG1vdXNlZG93blggPSAwO1xuICAgICAgICB3cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdmVIYW5kbGVyKTtcbiAgICAgICAgd3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEhhbmRsZXIpO1xuICAgIH07XG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbW91c2Vkb3duWCA9IGUuY2xpZW50WCA7XG4gICAgICAgIHJlc3VsdERpdlBvc3Rpb25YID0gcGFyc2VJbnQocmVzdWx0RGl2LnN0eWxlLnRyYW5zZm9ybS5zbGljZSgxMSwgLTEpKTtcbiAgICAgICAgcmVzdWx0RGl2LnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtIC4xcyc7XG4gICAgICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUhhbmRsZXIpO1xuICAgICAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG4gICAgfSk7XG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIG1vdXNlZG93blggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgcmVzdWx0RGl2UG9zdGlvblggPSBwYXJzZUludChyZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtLnNsaWNlKDExLCAtMSkpO1xuICAgICAgICByZXN1bHREaXYuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gLjFzJztcbiAgICAgICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3ZlSGFuZGxlcik7XG4gICAgICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwSGFuZGxlcik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7c3dpcGV9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvc3dpcGVMaXN0ZW5lci5qcyIsImltcG9ydCB7c2VhcmNoRm9ybSwgc3VibWl0Rm9ybSwgc2VhcmNoLCB3cmFwcGVyLCByZXN1bHREaXYsIHBhZ2VzfSBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7c2VhcmNoTGlzdGVuZXJ9IGZyb20gJy4vc2VhcmNoTGlzdGVuZXIuanMnO1xuaW1wb3J0IHtyZXF9IGZyb20gJy4vcmVxU2VhcmNoLmpzJztcbmltcG9ydCB7cGFnZUxpc3RlbmVyfSBmcm9tICcuL3BhZ2VMaXN0ZW5lci5qcyc7XG5pbXBvcnQge2NoYW5nZVBhZ2V9IGZyb20gJy4vY2hhbmdlUGFnZS5qcyc7XG5pbXBvcnQge3N3aXBlfSBmcm9tICcuL3N3aXBlTGlzdGVuZXIuanMnO1xuaW1wb3J0IHtjaGFuZ2VOdW1iZXJPZlBhZ2VzfSBmcm9tICcuL2NoYW5nZU51bWJlck9mUGFnZXMuanMnO1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiBwcmV2RGVmKGUpIHtlLnByZXZlbnREZWZhdWx0KCk7fSwgZmFsc2UpO1xuXG4gICAgbGV0IG9iaiA9IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgIGNvdW50UmVzdWx0OiAwLFxuICAgICAgICByZXN1bHRQZXJQYWdlOiA0LFxuICAgICAgICBudW1iZXJPZlBhZ2VzOiAwLFxuICAgICAgICBuZXh0UGFnZVRva2VuOiAnJyxcbiAgICAgICAgY2hhZ2VGb3JTd2lwZTogMzAwLFxuICAgICAgICBvZmZzZXRXcmFwcGVyOiAxNDgwXG4gICAgfTtcblxuICAgIGxldCBzaXplT2JqID0ge1xuICAgICAgICBzZWFyY2hXaWR0aDogc2VhcmNoLnN0eWxlLndpZHRoLFxuICAgICAgICBzZWFyY2hGb3JtV2lkdGg6IHNlYXJjaEZvcm0uc3R5bGUud2lkdGgsXG4gICAgICAgIHdyYXBwZXJXaWR0aDogd3JhcHBlci5zdHlsZS53aWR0aFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDwgNzEwIHx8IHNjcmVlbi53aWR0aCA8IDcxMCkge1xuICAgICAgICAgICAgc2l6ZU9iai5zZWFyY2hXaWR0aCA9IDI1MDtcbiAgICAgICAgICAgIHNpemVPYmouc2VhcmNoRm9ybVdpZHRoID0gMzAwO1xuICAgICAgICAgICAgc2l6ZU9iai53cmFwcGVyV2lkdGggPSAzMjA7XG4gICAgICAgICAgICBvYmoucmVzdWx0UGVyUGFnZSA9IDE7XG4gICAgICAgICAgICBvYmouY2hhZ2VGb3JTd2lwZSA9IDIwO1xuICAgICAgICAgICAgb2JqLm9mZnNldFdyYXBwZXIgPSAzNzA7XG4gICAgICAgIH0gZWxzZSBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IDEwODAgfHwgc2NyZWVuLndpZHRoIDwgMTA4MCkge1xuICAgICAgICAgICAgc2l6ZU9iai5zZWFyY2hXaWR0aCA9IDQ1MDtcbiAgICAgICAgICAgIHNpemVPYmouc2VhcmNoRm9ybVdpZHRoID0gNTAwO1xuICAgICAgICAgICAgc2l6ZU9iai53cmFwcGVyV2lkdGggPSA2OTA7XG4gICAgICAgICAgICBvYmoucmVzdWx0UGVyUGFnZSA9IDI7XG4gICAgICAgICAgICBvYmouY2hhZ2VGb3JTd2lwZSA9IDgwO1xuICAgICAgICAgICAgb2JqLm9mZnNldFdyYXBwZXIgPSA3NDA7XG4gICAgICAgIH0gZWxzZSBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IDE0NTAgfHwgc2NyZWVuLndpZHRoIDwgMTQ1MCkge1xuICAgICAgICAgICAgc2l6ZU9iai5zZWFyY2hXaWR0aCA9IDU1MDtcbiAgICAgICAgICAgIHNpemVPYmouc2VhcmNoRm9ybVdpZHRoID0gNjAwO1xuICAgICAgICAgICAgc2l6ZU9iai53cmFwcGVyV2lkdGggPSAxMDYwO1xuICAgICAgICAgICAgb2JqLnJlc3VsdFBlclBhZ2UgPSAzO1xuICAgICAgICAgICAgb2JqLmNoYWdlRm9yU3dpcGUgPSAxNzA7XG4gICAgICAgICAgICBvYmoub2Zmc2V0V3JhcHBlciA9IDExMTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaXplT2JqLnNlYXJjaFdpZHRoID0gNjUwO1xuICAgICAgICAgICAgc2l6ZU9iai5zZWFyY2hGb3JtV2lkdGggPSA3MDA7XG4gICAgICAgICAgICBzaXplT2JqLndyYXBwZXJXaWR0aCA9IDE0MzA7XG4gICAgICAgICAgICBvYmoucmVzdWx0UGVyUGFnZSA9IDQ7XG4gICAgICAgICAgICBvYmouY2hhZ2VGb3JTd2lwZSA9IDMwMDtcbiAgICAgICAgICAgIG9iai5vZmZzZXRXcmFwcGVyID0gMTQ4MDtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2guc3R5bGUud2lkdGggPSBzaXplT2JqLnNlYXJjaFdpZHRoICsgJ3B4JztcbiAgICAgICAgc2VhcmNoRm9ybS5zdHlsZS53aWR0aCA9IHNpemVPYmouc2VhcmNoRm9ybVdpZHRoICsgJ3B4JztcbiAgICAgICAgd3JhcHBlci5zdHlsZS53aWR0aCA9IHNpemVPYmoud3JhcHBlcldpZHRoICsgJ3B4JztcbiAgICB9XG5cbiAgICByZXNpemUoKTtcblxuICAgIG9iaiA9IHNlYXJjaExpc3RlbmVyKHNlYXJjaCwgcmVzdWx0RGl2LCBwYWdlcywgb2JqKTtcblxuICAgIG9iai5jdXJyZW50UGFnZSA9IHBhZ2VMaXN0ZW5lcihwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaik7XG5cbiAgICBzd2lwZSh3cmFwcGVyLCBwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaik7XG5cbiAgICB3aW5kb3cub25yZXNpemUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzTnVtYmVyT2ZQYWdlcyA9IG9iai5udW1iZXJPZlBhZ2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50UmVzdWx0ID0gKG9iai5jdXJyZW50UGFnZSAtIDEpICogb2JqLnJlc3VsdFBlclBhZ2UgKyAxO1xuICAgICAgICByZXNpemUoKTtcbiAgICAgICAgb2JqLm51bWJlck9mUGFnZXMgPSBNYXRoLmZsb29yKG9iai5jb3VudFJlc3VsdCAvIG9iai5yZXN1bHRQZXJQYWdlKTtcbiAgICAgICAgY2hhbmdlTnVtYmVyT2ZQYWdlcyhwYWdlcywgcHJldmlvdXNOdW1iZXJPZlBhZ2VzLCBvYmoubnVtYmVyT2ZQYWdlcyk7XG4gICAgICAgIHBhZ2VzLmNoaWxkTm9kZXNbb2JqLmN1cnJlbnRQYWdlIC0gMV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIG9iai5jdXJyZW50UGFnZSA9IE1hdGguY2VpbChjdXJyZW50UmVzdWx0IC8gb2JqLnJlc3VsdFBlclBhZ2UpO1xuICAgICAgICBwYWdlcy5jaGlsZE5vZGVzW29iai5jdXJyZW50UGFnZSAtIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tYWluLmpzIiwiZXhwb3J0ICAgICBmdW5jdGlvbiB2aWV3UmVzdWx0KGl0ZW0sIG51bWJlciwgcmVzdWx0RGl2KSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zP2tleT1BSXphU3lDMnFpcGdVM0duLXNOdEJsWG5tbjRRdlhENFNUT0pMM1UmaWQ9JHtpdGVtLmlkLnZpZGVvSWR9JnBhcnQ9c25pcHBldCxzdGF0aXN0aWNzYDtcbiAgICBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKChyZXNwKSA9PiByZXNwLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZ3VyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ZpZ3VyZScpO1xuICAgICAgICAgICAgY29uc3QgdXJsWW91dHViZSA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSR7aXRlbS5pZC52aWRlb0lkfWA7XG4gICAgICAgICAgICBmaWd1cmUuaW5uZXJIVE1MID0gYDxhIGhyZWY9JHt1cmxZb3V0dWJlfSBjbGFzcz1cInRpdGxlXCI+JHtkYXRhLml0ZW1zWzBdLnNuaXBwZXQudGl0bGV9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPSR7ZGF0YS5pdGVtc1swXS5zbmlwcGV0LnRodW1ibmFpbHMubWVkaXVtLnVybH0gYWx0PVwicHJldmlldyBpbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ2NhcHRpb24gY2xhc3M9XCJpbmZvcm1hdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGFubmVsXCI+JHtkYXRhLml0ZW1zWzBdLnNuaXBwZXQuY2hhbm5lbFRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZVwiPiR7ZGF0YS5pdGVtc1swXS5zbmlwcGV0LnB1Ymxpc2hlZEF0LnNsaWNlKDAsIDEwKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvdW50XCI+JHtkYXRhLml0ZW1zWzBdLnN0YXRpc3RpY3Mudmlld0NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2l0ZW0uc25pcHBldC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWdjYXB0aW9uPmA7XG4gICAgICAgICAgICBmaWd1cmUuY2xhc3NOYW1lID0gYGl0ZW0gJHtudW1iZXJ9YDtcbiAgICAgICAgICAgIHJlc3VsdERpdi5hcHBlbmRDaGlsZChmaWd1cmUpO1xuICAgICAgICAgICAgZmlndXJlLnN0eWxlLnRyYW5zZm9ybSA9YHRyYW5zbGF0ZVgoJHszNzAgKiBudW1iZXJ9cHgpYDtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+ICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpKVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9yZXFWaWRlby5qcyJdLCJzb3VyY2VSb290IjoiIn0=