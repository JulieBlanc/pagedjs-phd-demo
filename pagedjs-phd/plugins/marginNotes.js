
import { Handler } from '../paged.esm.js';


export class marginNotes extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.notesClass = ".pagedjs_margin-note"; // ← CSS selector for the note element (must be inline in the HTML)
        this.position = "outside";   // ← Specifies the position of margin notes relative to the main text: options are "outside", "inside", "left", "right"
        this.marginnoteOverflow = new Set();
    }

    beforeParsed(content) {

        let notes = content.querySelectorAll(this.notesClass);
        notes.forEach(function (note, index) {
            note.style.position = "absolute";
            note.classList.add("pagedjs_margin-note");
        }); 
        
        
        let positionRight = 'left: calc(var(--pagedjs-pagebox-width) - var(--pagedjs-margin-left) - var(--pagedjs-margin-right) - 1px); width: var(--pagedjs-margin-right);';
        let positionLeft = 'left: calc(var(--pagedjs-margin-left)*-1 - 1px); width: var(--pagedjs-margin-left);'

        let notePosition;

        switch (this.position) {
        case 'inside':
            notePosition = '.pagedjs_left_page ' + this.notesClass + '{' + positionRight + '} \
            .pagedjs_right_page ' + this.notesClass + '{' + positionLeft + '}';
            break;
        case 'left':
            notePosition = '.pagedjs_left_page ' + this.notesClass + '{' + positionLeft + '} \
            .pagedjs_right_page ' + this.notesClass + '{' + positionLeft + '}';
            break;
        case 'right':
            notePosition = '.pagedjs_left_page ' + this.notesClass + '{' + positionRight + '} \
            .pagedjs_right_page ' + this.notesClass + '{' + positionRight + '}';
            break;
        default:
            notePosition = '.pagedjs_left_page ' + this.notesClass + '{' + positionLeft + '} \
            .pagedjs_right_page ' + this.notesClass + '{' + positionRight + '}';
        }

        addcss(this.notesClass + '{ box-sizing: border-box; }');
        addcss(notePosition);

    }
 
}



/* FUNCTIONS -------------------------------------------------------------------------------------- 
--------------------------------------------------------------------------------------------------- */

// MARGINS

function marginNoteTop(elem) {
  let marginTop = parseInt(window.getComputedStyle(elem).marginTop, 10)
  return marginTop;
}

function marginNoteBottom(elem) {
  let marginBottom = parseInt(window.getComputedStyle(elem).marginBottom, 10)
  return marginBottom;
}

function biggestMargin(a, b) {
  let margin;
  let marginBottom = marginNoteBottom(a);
  let marginTop = marginNoteTop(b);
  if (marginBottom > marginTop) {
    margin = marginBottom;
  } else {
    margin = marginTop;
  }
  return margin;
}


// ADD CSS

function addcss(css) {
  var head = document.getElementsByTagName('head')[0];
  var s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  if (s.styleSheet) {   // IE
    s.styleSheet.cssText = css;
  } else {// the world
    s.appendChild(document.createTextNode(css));
  }
  head.appendChild(s);
}


// CAMEL CLASS NOTE

function toCamelClassNote(elem) {
  let splitClass = elem.split("-");
  if (splitClass.length > 1) {
    for (let s = 1; s < splitClass.length; ++s) {
      let strCapilize = splitClass[s].charAt(0).toUpperCase() + splitClass[s].slice(1)
      splitClass[s] = strCapilize;
    }
  }
  let reducer = (accumulator, currentValue) => accumulator + currentValue;
  let classCamel = splitClass.reduce(reducer);
  return classCamel;
}

