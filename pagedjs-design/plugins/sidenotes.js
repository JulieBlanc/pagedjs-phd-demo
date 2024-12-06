import { Handler } from '../paged.esm.js';

export class sidenotes extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.type = config.notes.type;
        this.notesClass = ".pagedjs_note";
        this.position = config.notes.position;
        this.sidenoteOverflow = new Set();
      
    }

    afterParsed(content) {


        if(this.type == "sidenote"){
            let notesClass = this.notesClass;

   
            let notes = content.querySelectorAll(notesClass)
            notes.forEach(function (note, index) {
                note.style.position = "absolute";
                note.style.top = "0px";
                note.style.left = "0px";
                note.classList.add("pagedjs_sidenote");
            });
           
        }

       
    }


    afterPageLayout(pageElement, page, breakToken) {
        let notes = pageElement.querySelectorAll(".pagedjs_sidenote");

        let selectedMargin;
        if (this.position == "left") { selectedMargin = ".pagedjs_margin-left" }
        else if (this.position == "right") { selectedMargin = ".pagedjs_margin-right" }
        else if (this.position == "outside" && pageElement.classList.contains('pagedjs_left_page')) {
            selectedMargin = ".pagedjs_margin-left"
        }
        else if (this.position == "outside" && pageElement.classList.contains('pagedjs_right_page')) {
            selectedMargin = ".pagedjs_margin-right"
        }
        else if (this.position == "inside" && pageElement.classList.contains('pagedjs_left_page')) {
            selectedMargin = ".pagedjs_margin-right"
        }
        else if (this.position == "inside" && pageElement.classList.contains('pagedjs_right_page')) {
            selectedMargin = ".pagedjs_margin-left"
        } else {

            if (pageElement.classList.contains('pagedjs_right_page')) {
                selectedMargin = ".pagedjs_margin-right"
            } else {
                selectedMargin = ".pagedjs_margin-left"
            }
        }

        if (notes || this.sidenoteOverflow.size > 0) {

            let marginbox = pageElement.querySelector(selectedMargin);
            marginbox.style.display = "block";

            let marginContents = marginbox.querySelectorAll(".pagedjs_margin");
            marginContents.forEach(function (marginContent, index) {
                marginContent.style.display = "none";
            });


            let container = document.createElement("div");
            container.className = "sidenote-container";
            marginbox.appendChild(container);

            let paddingTopContainer;


            if (this.elemAlignTo == undefined) {
                paddingTopContainer = 0;
            } else {
                let firstElem = pageElement.querySelector(this.elemAlignTo);
                if (firstElem) {
                    let textHeight = firstElem.offsetTop;
                    let textPadding = parseInt(firstElem.style.paddingTop);
                    let sidenoteTop;

                    if (textPadding) {
                        sidenoteTop = textHeight + textPadding;

                    } else {
                        sidenoteTop = textHeight;
                    }
                    paddingTopContainer = sidenoteTop;
                } else {
                    paddingTopContainer = 0;
                }
            }


            container.style.paddingTop = paddingTopContainer + "px";


            // Put notes from previous page ------------------------
            if (this.sidenoteOverflow.size > 0) {
                // reverse set
                const notesArray = Array.from(this.sidenoteOverflow);
                notesArray.reverse();
                // add notes in order
                notesArray.forEach(note => {
                    container.appendChild(note);
                });
            }
            this.sidenoteOverflow.clear();


            // Display all notes of the page ------------------------
            for (let n = 0; n < notes.length; ++n) {
                container.appendChild(notes[n]);
                notes[n].style.position = "relative";
            }

            // Push notes tha overflow ------------------------
            let maxHeight = marginbox.offsetHeight;
            checkOverflownote(this.notesClass, pageElement, maxHeight, this.sidenoteOverflow, container);

        }

    }






}






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



function checkOverflownote(notesClass, pageElement, maxHeight, arrayOverflow, container) {
    let notes = pageElement.querySelectorAll(notesClass);


    let notesHeightAll = [];

    for (let n = 0; n < notes.length; ++n) {

        // Add height of the notes to array notesHeightAll 
        let noteHeight = notes[n].offsetHeight;
        notesHeightAll.push(noteHeight);
        // Add margins of the notes to array notesHeightAll 
        if (n >= 1) {
            let margins = biggestMargin(notes[n - 1], notes[n]);
            notesHeightAll.push(margins);
        }
    }

    // If notes on page
    if (notesHeightAll.length > 0) {

        // Calculate if all notes fit on the page;
        let reducer = (accumulator, currentValue) => accumulator + currentValue;
        let allHeight = notesHeightAll.reduce(reducer);
        let paddingContainer = parseInt(container.style.paddingTop);

        let totalHeight = allHeight + paddingContainer;


        if (totalHeight > maxHeight) {

            let lastNote = notes[notes.length - 1];
            arrayOverflow.add(lastNote);
            lastNote.remove();

            checkOverflownote(notesClass, pageElement, maxHeight, arrayOverflow, container);

        }


    }
}