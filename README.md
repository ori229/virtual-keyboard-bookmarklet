# virtual-keyboard-bookmarklet

bookmarklet which loads a virtual keyboard


bookmarklet:

javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='http://icc-aleph22.hosted.exlibrisgroup.com/bm2.js?';}})();

Demo: http://icc-aleph22.hosted.exlibrisgroup.com/bm_menu.htm

TODO: enable moving it around with http://jqueryui.com/draggable/ and add an exit button



