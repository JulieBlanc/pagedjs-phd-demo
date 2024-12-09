import { Handler } from '../../paged.esm.js';
// Fix for footnote reset
// https://gitlab.com/JulieBlanc, 2024

export class fixFootnotes extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.reset = ".chapter"; // reset on this element(s), if you want to reset on the page: "page"
        this.counter = 0; 
    }

    afterParsed(content){
    
        if(config.notes.resetCounter){
            this.reset = config.notes.resetCounter;
        }

        let elems = content.querySelectorAll(this.reset);        
        elems.forEach(function (elem, index) {
            var span = document.createElement('span');
            span.classList.add("reset-fix-footnote");
            span.style.position = "absolute";
            elem.insertBefore(span, elem.firstChild);
        });
    }


    afterPageLayout(pageElement, page, breakToken){
  
        // reset on pages
        if(this.reset === "page"){
            this.counter = 0;  
        }

        // reset on specific element
        let newchapter = pageElement.querySelector('.reset-fix-footnote');
        if(newchapter){
            this.counter = 0;        
        }

        let footnotes = pageElement.querySelectorAll(".pagedjs_footnote_content [data-counter-note]");

       
        let callnotes = pageElement.querySelectorAll('a.pagedjs_footnote');
        callnotes.forEach((call, index) => {
            this.counter = this.counter + 1; // increment
            let num = this.counter;

            // update data-counter for call
            call.setAttribute('data-data-counter-footnote-increment', num);
            call.style.counterReset = "footnote " + num;

            // update data-counter for marker
            let footnote = footnotes[index];
            footnote.setAttribute('data-counter-note', num);
            footnote.style.counterReset = "footnote-marker " + num;

        });
     
    }
  
}




