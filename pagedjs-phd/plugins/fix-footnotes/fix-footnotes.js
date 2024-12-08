import { Handler } from '../../paged.esm.js';

export class fixFootnotes extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.section = "body"; // reset on this element
        this.counter = 0; 
    }


    afterParsed(content){
    
        if(config.notes.sections){
            this.section = config.notes.sections;
        }

        let sections = content.querySelectorAll(this.section);        
        sections.forEach(function (section, index) {
            var div = document.createElement('div');
            div.classList.add("reset-fix-footnote");
            div.style.position = "absolute";
            section.insertBefore(div, section.firstChild);
        });
    }


    afterPageLayout(pageElement, page, breakToken){
  
        // reset 
        let newchapter = pageElement.querySelector('.reset-fix-footnote');
        if(newchapter){
            this.counter = 0;        
        }

        let footnotes = pageElement.querySelectorAll(".pagedjs_footnote_content [data-counter-note]");

       
        let callnotes = pageElement.querySelectorAll('a.pagedjs_footnote');
        callnotes.forEach((call, index) => {
            this.counter = this.counter + 1; // increment
            let num = this.counter - 1;

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




