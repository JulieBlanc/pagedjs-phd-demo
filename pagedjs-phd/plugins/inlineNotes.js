import { Handler } from '../paged.esm.js';

export class inlineNotesHandler extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.section = ""; // ← CSS selector where you want reset note counter
        this.input = ".footnote-ref"; // ← CSS selector of the call element 
        this.containerNotes = "#footnotes"; // ← CSS selector of the container of the footnote
        this.type = "footnote"; // ← Type of notes: options are "footnote", "sidenote"
    }


    beforeParsed(content){        

         /** pagedjs-design
         * Specific to pagedjs-design, overwrite values
        **/
            if(config.notes){
                if(config.notes.type){ this.type = config.notes.type; }
                if(config.notes.sections){ this.section = config.notes.sections; }
                if(config.notes.callInput){ this.input = config.notes.callInput; }
                if(config.notes.containerNotes){ this.containerNotes = config.notes.containerNotes; }
            }
        /* */

 
        inlineNotes({
                content: content,
                section: this.section,
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

    if(params.section != ""){
        let sections = content.querySelectorAll(params.section);
        if(sections.length > 0){
            sections.forEach(function (section, index) {
                createNotes(content, section, input, type);
            });
        }else{
            createNotes(content, content, input, type);
        }
    }else{
        createNotes(content, content, input, type);
    }
    
  
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
 
 
 function createNotes(content, section, input, type){
 
     let calls = section.querySelectorAll(input);
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


 
         if(type != "footnote"){
             inline_note.innerHTML = '<span class="note-marker">' + num + '</span>' + unwrapBlockChildren(note).innerHTML;
         }else{
             inline_note.innerHTML = unwrapBlockChildren(note).innerHTML;
         }
 
         call.after(inline_note);
 
 
         if(type != "footnote"){
            let ref_note = document.createElement('span');
            ref_note.className = "note-call";
            ref_note.dataset.counterNote = num;
            ref_note.innerHTML = num;
            call.after(ref_note);
        }
   
 
         call.parentElement.removeChild(call);
 
 
     })
    
 }