(function(){
  var v = "1.3.2";
  // check for jQuery. if it exists, verify it's not too old.
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done = false;
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        done = true;
        initMyBookmarklet();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    initMyBookmarklet();
  }

  function initMyBookmarklet() {
    (window.myBookmarklet = function() {
      function getSelText() {
        var s = '';
        if (window.getSelection) {
          s = window.getSelection();
        } else if (document.getSelection) {
          s = document.getSelection();
        } else if (document.selection) {
          s = document.selection.createRange().text;
        }
        return s;
      }

// checking a few times each second if new input fields added dinamically
setInterval(function(){
 $("iframe").contents().find("textarea,input").each(function( index ) {
  //$(this).css("background-color", "red");
  //console.log( index + ": " + $( this ).attr("value") );
  $(this).blur(function(){
    console.log( "blur a textarea with text:" + $(this).text() );
    lasttext = this;
  });
 });

 $( "textarea,input" ).each(function( index ) {
  //$(this).css("background-color", "red");
  //console.log( index + ": " + $( this ).attr("value") );
  $(this).blur(function(){
    console.log( "blur a textarea with text:" + $(this).text() );
    lasttext = this;
  });
 });
}, 500 );

          $("body").append("\
          <div id='vkframe'>\
<button type=button onClick=doinsert('A');>A</button>\
<button type=button onClick=doinsert('b');>b</button>\
<button type=button onClick=doinsert('א');>א</button>\
<button type=button onClick=doinsert('&#x263A;');>&#x263A;</button>\
<button type=button onClick=wrap('{','}');>{_}</button>\
<br/>\
<button type=button onClick=doinsert('&#x202C;');>&#x25BC; PDF</button>\
<button type=button onClick=doinsert('&#x200E;');>&#x2192; LRM</button>\
<button type=button onClick=doinsert('&#x200F;');>&#x2190; RLM</button>\
<button type=button onClick=doinsert('&#x202A;');>&#x250C; LRE</button>\
<button type=button onClick=doinsert('&#x202B;');>&#x2510; RLE</button>\
            <style type='text/css'>\
              #vkframe { position: absolute; width: auto; top: 0; left: 20;\
              border:thin solid gold; cursor: pointer; z-index: 900; }\
            </style>\
          </div>");
    })();
  }

})();
var lasttext;
// http://stackoverflow.com/questions/54147/how-do-i-insert-a-character-at-the-caret-with-javascript
function doinsert(charToAdd) {
    if (! lasttext) { alert ("Before using the virtual keyboard select one of the input boxes."); return;}
    var oldtext = lasttext.value;
    var curpos = lasttext.selectionStart;
    pretext = oldtext.substring(0,curpos);
    posttest = oldtext.substring(curpos,oldtext.length);
    lasttext.value = pretext + charToAdd + posttest;
    setCaretToPos(lasttext, curpos + 1);
}

function wrap(pre,post) {
    if (! lasttext) { alert ("Before using the virtual keyboard select one of the input boxes."); return;}
    var oldtext = lasttext.value;
    var curpos = lasttext.selectionStart;
    lasttext.value = pre+oldtext+post;
    setCaretToPos(lasttext, curpos + 1);
}

// http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}
