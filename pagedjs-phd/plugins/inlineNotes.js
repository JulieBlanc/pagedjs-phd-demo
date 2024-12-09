import { Handler } from '../paged.esm.js';
// A simple plugin to inline notes
// https://gitlab.com/JulieBlanc, 2024

export class inlineNotesHandler extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.input = ".footnote-ref"; // ← CSS selector of the call element 
        this.containerNotes = "#footnotes"; // ← CSS selector of the container of the footnote
        this.type = "footnote"; // ← Type of notes (just to add a class: ".pagedjs_footnote")
    }


    beforeParsed(content){   

         /** pagedjs-design
         * Specific to pagedjs-design, overwrite values
        **/
            if(config.notes){
                if(config.notes.type){ this.type = config.notes.type; }
                if(config.notes.callInput){ this.input = config.notes.callInput; }
                if(config.notes.containerNotes){ this.containerNotes = config.notes.containerNotes; }
            }
        /* */

 
        inlineNotes({
                content: content,
                input: this.input,
                containerNotes: this.containerNotes,
                type: this.type
            });
    }

}



function inlineNotes(params){

    let content = params.content;
    let input = params.input;
    let type = params.type;
    
    createNotes(content, input, type);
  
     let noteContainer = content.querySelector(params.containerNotes);
     if(noteContainer){
        noteContainer.remove();
     }
 
}
 
 
 function getBlocks(element){
     return element.querySelectorAll('div,p,blockquote,section,article,h1,h2,h3,h4,h5,h6,figure');
 }
 
 // get only inline-level tags
 function unwrapBlockChildren(element) {
     let blocks = getBlocks(element);
     
     blocks.forEach(block => {
         block.insertAdjacentHTML("beforebegin", block.innerHTML);
         block.remove();
     });
     let remainingblocks = getBlocks(element);
     if(remainingblocks.length) unwrapBlockChildren(element);
     return element;
 }
 
 
 function createNotes(content, input, type){
 
     let calls = content.querySelectorAll(input);
     calls.forEach( (call, index) => {
 
    
         let note = content.querySelector(call.getAttribute('href'));

         let back = note.querySelector(".footnote-back");
         if(back){
            back.remove();
         }
        
         let inline_note = document.createElement('span');
         inline_note.className = "pagedjs_" + type;
         let num = index + 1;
         inline_note.dataset.counterNote = num;

         inline_note.innerHTML = unwrapBlockChildren(note).innerHTML;
         call.after(inline_note);
 
         call.parentElement.removeChild(call);
 
 
     })
    
 }