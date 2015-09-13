# virtual-keyboard-bookmarklet
bookmarklet which loads a virtual keyboard - draft

TODO: Add letters...
TODO: http://jqueryui.com/draggable/

Demo: http://icc-aleph22.hosted.exlibrisgroup.com/bm_menu.htm

bookmarklet:
javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='http://icc-aleph22.hosted.exlibrisgroup.com/bm2.js?';}})();

