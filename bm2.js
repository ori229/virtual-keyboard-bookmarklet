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

$( "textarea,input" ).each(function( index ) {
  $(this).css("background-color", "red");
  console.log( index + ": " + $( this ).attr("value") );
  $(this).blur(function(){
    console.log( "blur a textarea with text:" + $(this).text() );
    lasttext = this;
  });
});

      if ($("#wikiframe").length == 0) {
          $("body").append("\
          <div id='wikiframe'>\
<button type=button onClick=doinsert('A');>A</button>\
<button type=button onClick=doinsert('B');>B</button>\
            <style type='text/css'>\
              #wikiframe { position: absolute; width: 100px; height: 50px; top: 0; left: 0; background-color: rgba(255,255,255,.25); cursor: pointer; z-index: 900; }\
            </style>\
          </div>");
      } else {
        $("#wikiframe_veil").fadeOut(750);
        $("#wikiframe iframe").slideUp(500);
        setTimeout("$('#wikiframe').remove()", 750);
      }
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
