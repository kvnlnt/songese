Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

// Chord pattern
var chords = /(<br\/>| )?\b([CDEFGAB])(#|##|b|bb)?(maj7|maj|min7|min|sus2)? /g;
var tags   = /(<([^>]+)>)/ig;
var empty  = /<[^\/>][^>]*><\/[^>]+>/;
function colorize(song){
        var striptags = song.replace(tags,'');
        // console.log(striptags);
        // console.log(song);
        colorized = striptags.replace(chords, function($0){
            return " <chord>"+$0.replace(/ /g,'')+"</chord> ";
        });
    return colorized;
}

function getTheCaret(scope, elem){
    var elem   = document.getElementById(elem),
        sel    = window.getSelection(),
        range  = sel.getRangeAt(0),
        index  = 0,
        ichar  = range.endOffset,
        node   = sel.focusNode,
        result = {};
    sel.removeAllRanges();
    sel.addRange(range);
    elem.focus();
    while( (node = node.previousSibling) != null ){ index++; };
    scope.node  = index;
    scope.ichar = ichar;
    console.log("GET node=" + index + " ichar=" + ichar);
}

function setTheCaret(scope, elem, node, ichar) {
    var elem  = document.getElementById(elem),
        range = document.createRange(),
        sel   = window.getSelection();
    range.setStart(elem.childNodes[node], ichar); // (node, character)
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    elem.focus();
    scope.node  = node;
    scope.ichar = ichar;
    console.log("SET node=" + node + " ichar=" + ichar);
}
