import { Handler } from '../paged.esm.js';

export class fixFootnotes extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.counter = 0; 
    }

    
    afterPageLayout(pageElement, page, breakToken){
  
        // reset on h2 chapter
        let newchapter = pageElement.querySelector('.chapter h2');
        if(newchapter){
            this.counter = 0;        
        }

        // increment counter fix
        let callnotes = pageElement.querySelectorAll('a.pagedjs_note');
        callnotes.forEach((call, index) => {
            this.counter = this.counter + 1;
            call.dataset.counterFix = this.counter;
        });

     
    }
}