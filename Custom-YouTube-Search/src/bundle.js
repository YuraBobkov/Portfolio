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
var resultDiv = exports.resultDiv = document.createElement('div');
resultDiv.setAttribute('id', 'result');
wrapper.appendChild(resultDiv);
var pages = exports.pages = document.createElement('div');
pages.setAttribute('id', 'pages');

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
        resultDiv.style.transform = 'translateX(' + (parseInt(resultDiv.style.transform.slice(11, -3), 10) + (clientX - mousedownX)) + 'px)';
        mousedownX = clientX;
    };

    var mouseUpHandler = function mouseUpHandler(e) {
        pages.childNodes[obj.currentPage - 1].classList.remove('active');
        resultDiv.style.transition = 'transform 0.5s';
        var changePosition = resultDivPostionX - parseInt(resultDiv.style.transform.slice(11, -3), 10);
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
        resultDiv.style.transition = 'transform 0.1s';
        wrapper.addEventListener('mousemove', moveHandler);
        wrapper.addEventListener('mouseup', mouseUpHandler);
    });

    wrapper.addEventListener('touchstart', function (e) {
        mousedownX = e.touches[0].clientX;
        resultDivPostionX = parseInt(resultDiv.style.transform.slice(11, -1));
        resultDiv.style.transition = 'transform 0.1s';
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

var _elements = __webpack_require__(3);

function viewResult(item, number, resultDiv) {
    var url = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC2qipgU3Gn-sNtBlXnmn4QvXD4STOJL3U&id=' + item.id.videoId + '&part=snippet,statistics';
    fetch(url).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        document.body.appendChild(_elements.wrapper);
        document.body.appendChild(_elements.pages);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWZhY2RjNGEwNTIzZjAzOTRkYmYiLCJ3ZWJwYWNrOi8vLy4vanMvY2hhbmdlUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9yZXFTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2hhbmdlTnVtYmVyT2ZQYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYWdlTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNoTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc3dpcGVMaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL2pzL3JlcVZpZGVvLmpzIl0sIm5hbWVzIjpbImNoYW5nZVBhZ2UiLCJudW1iZXIiLCJwYWdlcyIsInJlc3VsdERpdiIsInNlYXJjaCIsIm9iaiIsImNoaWxkTm9kZXMiLCJjdXJyZW50UGFnZSIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwidHJhbnNmb3JtIiwib2Zmc2V0V3JhcHBlciIsIm51bWJlck9mUGFnZXMiLCJyZXEiLCJ1cmwiLCJuZXh0UGFnZVRva2VuIiwidmFsdWUiLCJmZXRjaCIsInRoZW4iLCJyZXNwIiwianNvbiIsImRhdGEiLCJwcmV2aW91c0NvdW50IiwiY291bnRSZXN1bHQiLCJwcmV2aW91c051bWJlck9mUGFnZXMiLCJpdGVtcyIsImxlbmd0aCIsIk1hdGgiLCJmbG9vciIsInJlc3VsdFBlclBhZ2UiLCJhbGVydCIsImZvckVhY2giLCJpdGVtIiwiaSIsImFyciIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvciIsImNoYW5nZU51bWJlck9mUGFnZXMiLCJpbm5lckhUTUwiLCJyZW1vdmUiLCJzZWFyY2hGb3JtIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3VibWl0Rm9ybSIsInNldEF0dHJpYnV0ZSIsIndyYXBwZXIiLCJwYWdlTGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwicGFyc2VJbnQiLCJzZWFyY2hMaXN0ZW5lciIsImtleUNvZGUiLCJxdWVyeVNlbGVjdG9yIiwic3dpcGUiLCJyZXN1bHREaXZQb3N0aW9uWCIsIm1vdXNlZG93blgiLCJtb3ZlSGFuZGxlciIsImNsaWVudFgiLCJ0b3VjaGVzIiwic2xpY2UiLCJtb3VzZVVwSGFuZGxlciIsInRyYW5zaXRpb24iLCJjaGFuZ2VQb3NpdGlvbiIsImNoYWdlRm9yU3dpcGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwid2luZG93Iiwib25sb2FkIiwicHJldkRlZiIsInByZXZlbnREZWZhdWx0Iiwic2l6ZU9iaiIsInNlYXJjaFdpZHRoIiwid2lkdGgiLCJzZWFyY2hGb3JtV2lkdGgiLCJ3cmFwcGVyV2lkdGgiLCJyZXNpemUiLCJpbm5lcldpZHRoIiwic2NyZWVuIiwib25yZXNpemUiLCJjdXJyZW50UmVzdWx0IiwiY2VpbCIsInZpZXdSZXN1bHQiLCJpZCIsInZpZGVvSWQiLCJmaWd1cmUiLCJ1cmxZb3V0dWJlIiwic25pcHBldCIsInRpdGxlIiwidGh1bWJuYWlscyIsIm1lZGl1bSIsImNoYW5uZWxUaXRsZSIsInB1Ymxpc2hlZEF0Iiwic3RhdGlzdGljcyIsInZpZXdDb3VudCIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7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Q0EsWUFBTTJDLFNBQVMvQyxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQSxZQUFNK0Msa0RBQWdEN0QsS0FBSzBELEVBQUwsQ0FBUUMsT0FBOUQ7QUFDQUMsZUFBT2xELFNBQVAsZ0JBQThCbUQsVUFBOUIsdUJBQTBEeEUsS0FBS0ksS0FBTCxDQUFXLENBQVgsRUFBY3FFLE9BQWQsQ0FBc0JDLEtBQWhGLG1EQUMyQjFFLEtBQUtJLEtBQUwsQ0FBVyxDQUFYLEVBQWNxRSxPQUFkLENBQXNCRSxVQUF0QixDQUFpQ0MsTUFBakMsQ0FBd0NuRixHQURuRSx5SkFHZ0RPLEtBQUtJLEtBQUwsQ0FBVyxDQUFYLEVBQWNxRSxPQUFkLENBQXNCSSxZQUh0RSx3RUFJNkM3RSxLQUFLSSxLQUFMLENBQVcsQ0FBWCxFQUFjcUUsT0FBZCxDQUFzQkssV0FBdEIsQ0FBa0MvQixLQUFsQyxDQUF3QyxDQUF4QyxFQUEyQyxFQUEzQyxDQUo3Qyx5RUFLOEMvQyxLQUFLSSxLQUFMLENBQVcsQ0FBWCxFQUFjMkUsVUFBZCxDQUF5QkMsU0FMdkUsNEVBTWlEckUsS0FBSzhELE9BQUwsQ0FBYVEsV0FOOUQ7QUFRQVYsZUFBTzdDLFNBQVAsYUFBMkIvQyxNQUEzQjtBQUNBRSxrQkFBVStDLFdBQVYsQ0FBc0IyQyxNQUF0QjtBQUNBQSxlQUFPbkYsS0FBUCxDQUFhQyxTQUFiLG1CQUFzQyxNQUFNVixNQUE1QztBQUNILEtBbEJMLEVBbUJLbUMsS0FuQkwsQ0FtQlc7QUFBQSxlQUFVQyxRQUFRQyxHQUFSLENBQVlDLEtBQUtDLFNBQUwsQ0FBZUMsS0FBZixDQUFaLENBQVY7QUFBQSxLQW5CWDtBQXFCSCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWZhY2RjNGEwNTIzZjAzOTRkYmYiLCJpbXBvcnQge3JlcX0gZnJvbSAnLi9yZXFTZWFyY2guanMnO1xuXG5leHBvcnQgICAgZnVuY3Rpb24gY2hhbmdlUGFnZShudW1iZXIsIHBhZ2VzLCByZXN1bHREaXYsIHNlYXJjaCwgb2JqKSB7XG4gICAgcGFnZXMuY2hpbGROb2Rlc1tvYmouY3VycmVudFBhZ2UgLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICByZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7b2JqLm9mZnNldFdyYXBwZXIqKG51bWJlciAtIDEpfXB4KWA7XG4gICAgaWYobnVtYmVyICUgMyA9PT0gMCAmJiBudW1iZXIgKyAzID4gb2JqLm51bWJlck9mUGFnZXMgfHwgbnVtYmVyID09PSBvYmoubnVtYmVyT2ZQYWdlcykge1xuICAgICAgICByZXEocGFnZXMsIHJlc3VsdERpdiwgc2VhcmNoLCBvYmopO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NoYW5nZVBhZ2UuanMiLCJpbXBvcnQge3ZpZXdSZXN1bHR9IGZyb20gJy4vcmVxVmlkZW8uanMnO1xuaW1wb3J0IHtjaGFuZ2VOdW1iZXJPZlBhZ2VzfSBmcm9tICcuL2NoYW5nZU51bWJlck9mUGFnZXMuanMnO1xuXG5leHBvcnQgIGZ1bmN0aW9uIHJlcShwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaikge1xuICAgIGxldCB1cmw7XG4gICAgaWYob2JqLm5leHRQYWdlVG9rZW4gIT09ICcnKSB7XG4gICAgICAgIHVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD9rZXk9QUl6YVN5QzJxaXBnVTNHbi1zTnRCbFhubW40UXZYRDRTVE9KTDNVJnBhZ2VUb2tlbj0ke29iai5uZXh0UGFnZVRva2VufSZ0eXBlPXZpZGVvJnBhcnQ9c25pcHBldCZtYXhSZXN1bHRzPTE1JnE9JHtzZWFyY2gudmFsdWV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9zZWFyY2g/a2V5PUFJemFTeUMycWlwZ1UzR24tc050QmxYbm1uNFF2WEQ0U1RPSkwzVSZ0eXBlPXZpZGVvJnBhcnQ9c25pcHBldCZtYXhSZXN1bHRzPTE1JnE9JHtzZWFyY2gudmFsdWV9YDtcbiAgICB9XG4gICAgZmV0Y2godXJsKVxuICAgICAgICAudGhlbigocmVzcCkgPT4gcmVzcC5qc29uKCkpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c0NvdW50ID0gb2JqLmNvdW50UmVzdWx0O1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNOdW1iZXJPZlBhZ2VzID0gb2JqLm51bWJlck9mUGFnZXM7XG4gICAgICAgICAgICBvYmouY291bnRSZXN1bHQgPSBwcmV2aW91c0NvdW50ICsgZGF0YS5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICBvYmoubnVtYmVyT2ZQYWdlcyA9IE1hdGguZmxvb3Iob2JqLmNvdW50UmVzdWx0IC8gb2JqLnJlc3VsdFBlclBhZ2UpO1xuICAgICAgICAgICAgaWYob2JqLm5leHRQYWdlVG9rZW4gPT09ICcnICYmIG9iai5jb3VudFJlc3VsdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdObyByZXN1bHRzJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iai5uZXh0UGFnZVRva2VuID0gZGF0YS5uZXh0UGFnZVRva2VuO1xuICAgICAgICAgICAgICAgIGNoYW5nZU51bWJlck9mUGFnZXMocGFnZXMsIHByZXZpb3VzTnVtYmVyT2ZQYWdlcywgb2JqLm51bWJlck9mUGFnZXMpO1xuICAgICAgICAgICAgICAgIHBhZ2VzLmNoaWxkTm9kZXNbb2JqLmN1cnJlbnRQYWdlIC0gMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZGF0YS5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGksIGFycikge1xuICAgICAgICAgICAgICAgICAgICB2aWV3UmVzdWx0KGl0ZW0sIHByZXZpb3VzQ291bnQgKyBpLCByZXN1bHREaXYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSkpXG4gICAgcmV0dXJuIG9iajtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3JlcVNlYXJjaC5qcyIsImV4cG9ydCAgICAgZnVuY3Rpb24gY2hhbmdlTnVtYmVyT2ZQYWdlcyhwYWdlcywgcHJldmlvdXNOdW1iZXJPZlBhZ2VzLCBudW1iZXJPZlBhZ2VzKSB7XG4gICAgaWYgKG51bWJlck9mUGFnZXMgPiBwcmV2aW91c051bWJlck9mUGFnZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHByZXZpb3VzTnVtYmVyT2ZQYWdlczsgaSA8IG51bWJlck9mUGFnZXM7IGkrKykge1xuICAgICAgICAgICAgcGFnZXMuaW5uZXJIVE1MICs9IGA8YnV0dG9uIGNsYXNzPVwicGFnZVwiPiR7aSArIDF9PC9idXR0b24+YDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAobnVtYmVyT2ZQYWdlcyA8IHByZXZpb3VzTnVtYmVyT2ZQYWdlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gcHJldmlvdXNOdW1iZXJPZlBhZ2VzIC0gMTsgaSA+PSBudW1iZXJPZlBhZ2VzOyBpLS0pIHtcbiAgICAgICAgICAgIHBhZ2VzLmNoaWxkTm9kZXNbaV0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jaGFuZ2VOdW1iZXJPZlBhZ2VzLmpzIiwiZXhwb3J0IGNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5zZWFyY2hGb3JtLmNsYXNzTmFtZSA9ICdzZWFyY2gnO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWFyY2hGb3JtKTtcbmV4cG9ydCBjb25zdCBzdWJtaXRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5zdWJtaXRGb3JtLnNldEF0dHJpYnV0ZSgndHlwZScsJ3N1Ym1pdCcpO1xuc3VibWl0Rm9ybS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdzZWFyY2gtYnRuJyk7XG5zdWJtaXRGb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCdzZWFyY2gtYnRuJyk7XG5zdWJtaXRGb3JtLnNldEF0dHJpYnV0ZSgndmFsdWUnLCcnKTtcbnNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0Rm9ybSk7XG5leHBvcnQgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbnNlYXJjaC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N0cmluZ1NlYXJjaCcpO1xuc2VhcmNoLnNldEF0dHJpYnV0ZSgndHlwZScsICdzZWFyY2gnKTtcbnNlYXJjaC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ1NlYXJjaCcpO1xuc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChzZWFyY2gpO1xuZXhwb3J0IGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbndyYXBwZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3cmFwcGVyJyk7XG5leHBvcnQgY29uc3QgcmVzdWx0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5yZXN1bHREaXYuc2V0QXR0cmlidXRlKCdpZCcsICdyZXN1bHQnKTtcbndyYXBwZXIuYXBwZW5kQ2hpbGQocmVzdWx0RGl2KTtcbmV4cG9ydCBjb25zdCBwYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xucGFnZXMuc2V0QXR0cmlidXRlKCdpZCcsICdwYWdlcycpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZWxlbWVudHMuanMiLCJpbXBvcnQge2NoYW5nZVBhZ2V9IGZyb20gJy4vY2hhbmdlUGFnZS5qcyc7XG5cbmV4cG9ydCAgZnVuY3Rpb24gcGFnZUxpc3RlbmVyKHBhZ2VzLCByZXN1bHREaXYsIHNlYXJjaCwgb2JqKSB7XG4gICAgcGFnZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGFnZScpKSB7XG4gICAgICAgICAgICBwYWdlcy5jaGlsZE5vZGVzW29iai5jdXJyZW50UGFnZSAtIDFdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgb2JqLmN1cnJlbnRQYWdlID0gcGFyc2VJbnQoZS50YXJnZXQuaW5uZXJIVE1MLCAxMCk7XG4gICAgICAgICAgICBjaGFuZ2VQYWdlKG9iai5jdXJyZW50UGFnZSwgcGFnZXMsIHJlc3VsdERpdiwgc2VhcmNoLCBvYmopO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iai5jdXJyZW50UGFnZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3BhZ2VMaXN0ZW5lci5qcyIsImltcG9ydCB7cmVxfSBmcm9tICcuL3JlcVNlYXJjaC5qcyc7XG5cbmV4cG9ydCAgICAgZnVuY3Rpb24gc2VhcmNoTGlzdGVuZXIoc2VhcmNoLCByZXN1bHREaXYsIHBhZ2VzLCBvYmopIHtcbiAgICBzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgcmVzdWx0RGl2LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcmVzdWx0RGl2LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDBweCknO1xuICAgICAgICAgICAgcGFnZXMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBvYmoubnVtYmVyT2ZQYWdlcyA9IDA7XG4gICAgICAgICAgICBvYmouY291bnRSZXN1bHQgPSAwO1xuICAgICAgICAgICAgb2JqLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgICAgIG9iai5uZXh0UGFnZVRva2VuID0gJyc7XG4gICAgICAgICAgICBvYmogPSByZXEocGFnZXMsIHJlc3VsdERpdiwgc2VhcmNoLCBvYmopO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmVzdWx0RGl2LmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMHB4KSc7XG4gICAgICAgIHBhZ2VzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBvYmoubnVtYmVyT2ZQYWdlcyA9IDA7XG4gICAgICAgIG9iai5jb3VudFJlc3VsdCA9IDA7XG4gICAgICAgIG9iai5jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIG9iai5uZXh0UGFnZVRva2VuID0gJyc7XG4gICAgICAgIG9iaiA9IHJlcShwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3NlYXJjaExpc3RlbmVyLmpzIiwiaW1wb3J0IHtjaGFuZ2VQYWdlfSBmcm9tICcuL2NoYW5nZVBhZ2UuanMnO1xuXG5mdW5jdGlvbiBzd2lwZSh3cmFwcGVyLCBwYWdlcywgcmVzdWx0RGl2LCBzZWFyY2gsIG9iaikge1xuICAgIGxldCByZXN1bHREaXZQb3N0aW9uWCA9IDAsIG1vdXNlZG93blggPSAwO1xuXG4gICAgY29uc3QgbW92ZUhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjbGllbnRYID0gZS5jbGllbnRYIHx8IChlLnRvdWNoZXMubGVuZ3RoID8gZS50b3VjaGVzWzBdLmNsaWVudFggOiBudWxsKTtcbiAgICAgICAgcmVzdWx0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7cGFyc2VJbnQocmVzdWx0RGl2LnN0eWxlLnRyYW5zZm9ybS5zbGljZSgxMSwgLTMpLCAxMCkgKyAoY2xpZW50WCAgLSBtb3VzZWRvd25YKX1weClgO1xuICAgICAgICBtb3VzZWRvd25YID0gY2xpZW50WDtcbiAgICB9O1xuXG4gICAgY29uc3QgbW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHBhZ2VzLmNoaWxkTm9kZXNbb2JqLmN1cnJlbnRQYWdlIC0gMV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIHJlc3VsdERpdi5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAwLjVzJztcbiAgICAgICAgY29uc3QgY2hhbmdlUG9zaXRpb24gPSByZXN1bHREaXZQb3N0aW9uWCAtIHBhcnNlSW50KHJlc3VsdERpdi5zdHlsZS50cmFuc2Zvcm0uc2xpY2UoMTEsIC0zKSwgMTApO1xuICAgICAgICBpZihjaGFuZ2VQb3NpdGlvbiA+IG9iai5jaGFnZUZvclN3aXBlKSB7XG4gICAgICAgICAgICBvYmouY3VycmVudFBhZ2UrKztcbiAgICAgICAgfSBlbHNlIGlmKGNoYW5nZVBvc2l0aW9uIDwgLW9iai5jaGFnZUZvclN3aXBlKSB7XG4gICAgICAgICAgICBpZihvYmouY3VycmVudFBhZ2UgPiAxKSB7XG4gICAgICAgICAgICAgICAgb2JqLmN1cnJlbnRQYWdlLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hhbmdlUGFnZShvYmouY3VycmVudFBhZ2UsIHBhZ2VzLCByZXN1bHREaXYsIHNlYXJjaCwgb2JqKTtcbiAgICAgICAgbW91c2Vkb3duWCA9IDA7XG4gICAgICAgIHdyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUhhbmRsZXIpO1xuICAgICAgICB3cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG4gICAgfTtcblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBtb3VzZWRvd25YID0gZS5jbGllbnRYIDtcbiAgICAgICAgcmVzdWx0RGl2UG9zdGlvblggPSBwYXJzZUludChyZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtLnNsaWNlKDExLCAtMSkpO1xuICAgICAgICByZXN1bHREaXYuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gMC4xcyc7XG4gICAgICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUhhbmRsZXIpO1xuICAgICAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG4gICAgfSk7XG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIG1vdXNlZG93blggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgcmVzdWx0RGl2UG9zdGlvblggPSBwYXJzZUludChyZXN1bHREaXYuc3R5bGUudHJhbnNmb3JtLnNsaWNlKDExLCAtMSkpO1xuICAgICAgICByZXN1bHREaXYuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gMC4xcyc7XG4gICAgICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgbW92ZUhhbmRsZXIpO1xuICAgICAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2VVcEhhbmRsZXIpO1xuICAgIH0pO1xufVxuXG5leHBvcnQge3N3aXBlfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3N3aXBlTGlzdGVuZXIuanMiLCJpbXBvcnQge3NlYXJjaEZvcm0sIHN1Ym1pdEZvcm0sIHNlYXJjaCwgd3JhcHBlciwgcmVzdWx0RGl2LCBwYWdlc30gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQge3NlYXJjaExpc3RlbmVyfSBmcm9tICcuL3NlYXJjaExpc3RlbmVyLmpzJztcbmltcG9ydCB7cmVxfSBmcm9tICcuL3JlcVNlYXJjaC5qcyc7XG5pbXBvcnQge3BhZ2VMaXN0ZW5lcn0gZnJvbSAnLi9wYWdlTGlzdGVuZXIuanMnO1xuaW1wb3J0IHtjaGFuZ2VQYWdlfSBmcm9tICcuL2NoYW5nZVBhZ2UuanMnO1xuaW1wb3J0IHtzd2lwZX0gZnJvbSAnLi9zd2lwZUxpc3RlbmVyLmpzJztcbmltcG9ydCB7Y2hhbmdlTnVtYmVyT2ZQYWdlc30gZnJvbSAnLi9jaGFuZ2VOdW1iZXJPZlBhZ2VzLmpzJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gcHJldkRlZihlKSB7ZS5wcmV2ZW50RGVmYXVsdCgpO30sIGZhbHNlKTtcblxuICAgIGxldCBvYmogPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICBjb3VudFJlc3VsdDogMCxcbiAgICAgICAgcmVzdWx0UGVyUGFnZTogNCxcbiAgICAgICAgbnVtYmVyT2ZQYWdlczogMCxcbiAgICAgICAgbmV4dFBhZ2VUb2tlbjogJycsXG4gICAgICAgIGNoYWdlRm9yU3dpcGU6IDMwMCxcbiAgICAgICAgb2Zmc2V0V3JhcHBlcjogMTQ4MFxuICAgIH07XG5cbiAgICBsZXQgc2l6ZU9iaiA9IHtcbiAgICAgICAgc2VhcmNoV2lkdGg6IHNlYXJjaC5zdHlsZS53aWR0aCxcbiAgICAgICAgc2VhcmNoRm9ybVdpZHRoOiBzZWFyY2hGb3JtLnN0eWxlLndpZHRoLFxuICAgICAgICB3cmFwcGVyV2lkdGg6IHdyYXBwZXIuc3R5bGUud2lkdGhcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IDcxMCB8fCBzY3JlZW4ud2lkdGggPCA3MTApIHtcbiAgICAgICAgICAgIHNpemVPYmouc2VhcmNoV2lkdGggPSAyNTA7XG4gICAgICAgICAgICBzaXplT2JqLnNlYXJjaEZvcm1XaWR0aCA9IDMwMDtcbiAgICAgICAgICAgIHNpemVPYmoud3JhcHBlcldpZHRoID0gMzIwO1xuICAgICAgICAgICAgb2JqLnJlc3VsdFBlclBhZ2UgPSAxO1xuICAgICAgICAgICAgb2JqLmNoYWdlRm9yU3dpcGUgPSAyMDtcbiAgICAgICAgICAgIG9iai5vZmZzZXRXcmFwcGVyID0gMzcwO1xuICAgICAgICB9IGVsc2UgaWYod2luZG93LmlubmVyV2lkdGggPCAxMDgwIHx8IHNjcmVlbi53aWR0aCA8IDEwODApIHtcbiAgICAgICAgICAgIHNpemVPYmouc2VhcmNoV2lkdGggPSA0NTA7XG4gICAgICAgICAgICBzaXplT2JqLnNlYXJjaEZvcm1XaWR0aCA9IDUwMDtcbiAgICAgICAgICAgIHNpemVPYmoud3JhcHBlcldpZHRoID0gNjkwO1xuICAgICAgICAgICAgb2JqLnJlc3VsdFBlclBhZ2UgPSAyO1xuICAgICAgICAgICAgb2JqLmNoYWdlRm9yU3dpcGUgPSA4MDtcbiAgICAgICAgICAgIG9iai5vZmZzZXRXcmFwcGVyID0gNzQwO1xuICAgICAgICB9IGVsc2UgaWYod2luZG93LmlubmVyV2lkdGggPCAxNDUwIHx8IHNjcmVlbi53aWR0aCA8IDE0NTApIHtcbiAgICAgICAgICAgIHNpemVPYmouc2VhcmNoV2lkdGggPSA1NTA7XG4gICAgICAgICAgICBzaXplT2JqLnNlYXJjaEZvcm1XaWR0aCA9IDYwMDtcbiAgICAgICAgICAgIHNpemVPYmoud3JhcHBlcldpZHRoID0gMTA2MDtcbiAgICAgICAgICAgIG9iai5yZXN1bHRQZXJQYWdlID0gMztcbiAgICAgICAgICAgIG9iai5jaGFnZUZvclN3aXBlID0gMTcwO1xuICAgICAgICAgICAgb2JqLm9mZnNldFdyYXBwZXIgPSAxMTEwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2l6ZU9iai5zZWFyY2hXaWR0aCA9IDY1MDtcbiAgICAgICAgICAgIHNpemVPYmouc2VhcmNoRm9ybVdpZHRoID0gNzAwO1xuICAgICAgICAgICAgc2l6ZU9iai53cmFwcGVyV2lkdGggPSAxNDMwO1xuICAgICAgICAgICAgb2JqLnJlc3VsdFBlclBhZ2UgPSA0O1xuICAgICAgICAgICAgb2JqLmNoYWdlRm9yU3dpcGUgPSAzMDA7XG4gICAgICAgICAgICBvYmoub2Zmc2V0V3JhcHBlciA9IDE0ODA7XG4gICAgICAgIH1cbiAgICAgICAgc2VhcmNoLnN0eWxlLndpZHRoID0gc2l6ZU9iai5zZWFyY2hXaWR0aCArICdweCc7XG4gICAgICAgIHNlYXJjaEZvcm0uc3R5bGUud2lkdGggPSBzaXplT2JqLnNlYXJjaEZvcm1XaWR0aCArICdweCc7XG4gICAgICAgIHdyYXBwZXIuc3R5bGUud2lkdGggPSBzaXplT2JqLndyYXBwZXJXaWR0aCArICdweCc7XG4gICAgfVxuXG4gICAgcmVzaXplKCk7XG5cbiAgICBvYmogPSBzZWFyY2hMaXN0ZW5lcihzZWFyY2gsIHJlc3VsdERpdiwgcGFnZXMsIG9iaik7XG5cbiAgICBvYmouY3VycmVudFBhZ2UgPSBwYWdlTGlzdGVuZXIocGFnZXMsIHJlc3VsdERpdiwgc2VhcmNoLCBvYmopO1xuXG4gICAgc3dpcGUod3JhcHBlciwgcGFnZXMsIHJlc3VsdERpdiwgc2VhcmNoLCBvYmopO1xuXG4gICAgd2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwcmV2aW91c051bWJlck9mUGFnZXMgPSBvYmoubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgY29uc3QgY3VycmVudFJlc3VsdCA9IChvYmouY3VycmVudFBhZ2UgLSAxKSAqIG9iai5yZXN1bHRQZXJQYWdlICsgMTtcbiAgICAgICAgcmVzaXplKCk7XG4gICAgICAgIG9iai5udW1iZXJPZlBhZ2VzID0gTWF0aC5mbG9vcihvYmouY291bnRSZXN1bHQgLyBvYmoucmVzdWx0UGVyUGFnZSk7XG4gICAgICAgIGNoYW5nZU51bWJlck9mUGFnZXMocGFnZXMsIHByZXZpb3VzTnVtYmVyT2ZQYWdlcywgb2JqLm51bWJlck9mUGFnZXMpO1xuICAgICAgICBwYWdlcy5jaGlsZE5vZGVzW29iai5jdXJyZW50UGFnZSAtIDFdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICBvYmouY3VycmVudFBhZ2UgPSBNYXRoLmNlaWwoY3VycmVudFJlc3VsdCAvIG9iai5yZXN1bHRQZXJQYWdlKTtcbiAgICAgICAgcGFnZXMuY2hpbGROb2Rlc1tvYmouY3VycmVudFBhZ2UgLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvbWFpbi5qcyIsImltcG9ydCB7d3JhcHBlciwgcGFnZXN9IGZyb20gJy4vZWxlbWVudHMuanMnO1xuXG5cbmV4cG9ydCAgICAgZnVuY3Rpb24gdmlld1Jlc3VsdChpdGVtLCBudW1iZXIsIHJlc3VsdERpdikge1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3ZpZGVvcz9rZXk9QUl6YVN5QzJxaXBnVTNHbi1zTnRCbFhubW40UXZYRDRTVE9KTDNVJmlkPSR7aXRlbS5pZC52aWRlb0lkfSZwYXJ0PXNuaXBwZXQsc3RhdGlzdGljc2A7XG4gICAgZmV0Y2godXJsKVxuICAgICAgICAudGhlbigocmVzcCkgPT4gcmVzcC5qc29uKCkpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYWdlcyk7XG4gICAgICAgICAgICBjb25zdCBmaWd1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWd1cmUnKTtcbiAgICAgICAgICAgIGNvbnN0IHVybFlvdXR1YmUgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0ke2l0ZW0uaWQudmlkZW9JZH1gO1xuICAgICAgICAgICAgZmlndXJlLmlubmVySFRNTCA9IGA8YSBocmVmPSR7dXJsWW91dHViZX0gY2xhc3M9XCJ0aXRsZVwiPiR7ZGF0YS5pdGVtc1swXS5zbmlwcGV0LnRpdGxlfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0ke2RhdGEuaXRlbXNbMF0uc25pcHBldC50aHVtYm5haWxzLm1lZGl1bS51cmx9IGFsdD1cInByZXZpZXcgaW1hZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWdjYXB0aW9uIGNsYXNzPVwiaW5mb3JtYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hhbm5lbFwiPiR7ZGF0YS5pdGVtc1swXS5zbmlwcGV0LmNoYW5uZWxUaXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGVcIj4ke2RhdGEuaXRlbXNbMF0uc25pcHBldC5wdWJsaXNoZWRBdC5zbGljZSgwLCAxMCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb3VudFwiPiR7ZGF0YS5pdGVtc1swXS5zdGF0aXN0aWNzLnZpZXdDb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JHtpdGVtLnNuaXBwZXQuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlnY2FwdGlvbj5gO1xuICAgICAgICAgICAgZmlndXJlLmNsYXNzTmFtZSA9IGBpdGVtICR7bnVtYmVyfWA7XG4gICAgICAgICAgICByZXN1bHREaXYuYXBwZW5kQ2hpbGQoZmlndXJlKTtcbiAgICAgICAgICAgIGZpZ3VyZS5zdHlsZS50cmFuc2Zvcm0gPWB0cmFuc2xhdGVYKCR7MzcwICogbnVtYmVyfXB4KWA7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKSlcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcmVxVmlkZW8uanMiXSwic291cmNlUm9vdCI6IiJ9