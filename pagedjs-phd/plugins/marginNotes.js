
import { Handler } from '../paged.esm.js';


export class marginNotes extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.notesClass = ".pagedjs_margin-note"; // ← CSS selector for the note element (must be inline in the HTML)
        this.position = "outside";   // ← Specifies the position of margin notes relative to the main text: options are "outside", "inside", "left", "right"
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


    afterPageLayout(pageElement, page, breakToken) {
        let notes = pageElement.querySelectorAll(this.notesClass);
        let noteOverflow = false;
    
        let notesHeightAll = [];
    
        if (typeof (notes) != 'undefined' && notes != null && notes.length != 0) {
    
          for (let n = 0; n < notes.length; ++n) {
            // Display notes of the page 
            notes[n].style.display = "inline-block";
            // Add height of the notes to array notesHeightAll 
            let noteHeight = notes[n].offsetHeight;
            notesHeightAll.push(noteHeight);
            // Add margins of the notes to array notesHeightAll 
            if (n >= 1) {
              let margins = biggestMargin(notes[n - 1], notes[n]);
              notesHeightAll.push(margins);
            }
          }
    
    
          /* FIT PAGE ------------------------------------------------------------------------------------- */
    
          // Calculate if all notes fit on the page;
          let reducer = (accumulator, currentValue) => accumulator + currentValue;
          let allHeight = notesHeightAll.reduce(reducer);
          let maxHeight = pageElement.querySelectorAll(".pagedjs_page_content")[0].offsetHeight;
    
          if (allHeight > maxHeight) {
    
            /* IF DOESN'T FIT ----------------------------------------------------------------------------- */
    
            // positions all the notes one after the other starting from the top
            notes[0].style.top = parseInt(window.getComputedStyle(notes[0]).marginBottom, 10) * -1 + "px";
            for (let a = 1; a < notes.length; ++a) {
              let notePrev = notes[a - 1];
              let newMargin = biggestMargin(notePrev, notes[a]);
              let newTop = notePrev.offsetTop + notePrev.offsetHeight - marginNoteTop(notes[a]) + newMargin;
              notes[a].style.top = newTop + "px";
            }
            // alert
            let pageNumber = pageElement.dataset.pageNumber;
            alert("Rendering issue \n ☞ A marginal note overflow on page " + pageNumber + " (this is because there is too many on this page and paged.js can't breaks notes between pages for now.)");
            noteOverflow = true;
    
          } else {
    
            /* PUSH DOWN ---------------------------------------------------- */
            for (let i = 0; i < notes.length; ++i) {
              if (i >= 1) {
                let noteTop = notes[i].offsetTop;
                let notePrev = notes[i - 1];
                let newMargin = biggestMargin(notes[i], notePrev);
                let notePrevBottom = notePrev.offsetTop - marginNoteTop(notePrev) + notePrev.offsetHeight + newMargin;
                // Push down the note to bottom if it's over the previous one 
                if (notePrevBottom > noteTop) {
                  notes[i].style.top = notePrevBottom + "px";
                }
              }
            }
    
            /* PUSH UP ---------------------------------------------- */
    
            // Height of the page content 
            let contentHeight = pageElement.querySelectorAll(".pagedjs_page_content")[0].querySelectorAll("div")[0].offsetHeight;
    
            // Check if last note overflow 
            let nbrLength = notes.length - 1;
            let lastNote = notes[nbrLength];
            let lastNoteHeight = lastNote.offsetHeight + marginNoteTop(lastNote);
            let noteBottom = lastNote.offsetTop + lastNoteHeight;
    
            if (noteBottom > contentHeight) {
    
              // Push up the last note 
              lastNote.style.top = contentHeight - lastNoteHeight + "px";
    
              // Push up previous note(s) if if it's over the note
              for (let i = nbrLength; i >= 1; --i) {
                let noteLastTop = notes[i].offsetTop;
                let notePrev = notes[i - 1];
                let notePrevHeight = notePrev.offsetHeight;
                let newMargin = biggestMargin(notePrev, notes[i]);
                let notePrevBottom = notePrev.offsetTop + notePrev.offsetHeight + newMargin;
                if (notePrevBottom > noteLastTop) {
                  notePrev.style.top = notes[i].offsetTop - marginNoteTop(notePrev) - notePrevHeight - newMargin + "px";
                }
              }
    
            } /* end push up */
    
          }
    
        }
      }/* end afterPageLayout*/
    
    
 
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

