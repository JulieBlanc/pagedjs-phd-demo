/**
 * @file Script for handling footnotes.
 * Originally developped by Julien Bidoret, revised a lot by Julie Blanc for this project
 * @see https://github.com/esadpyrenees/PageTypeToPrint/blob/main/theme/esadpyrenees/js/print/footNotes.js
 */

export function inlineNotes(config){
    let input = config.input;
    let container = config.containerNotes;
    let type = config.type;


     if(config.section){
         let sections = document.querySelector("body").querySelectorAll(config.section);
         if(sections.length > 0){
            sections.forEach(function (section, index) {
                createNotes(section, input, container, type);
            })
         }else{
            let section = document.querySelector("body");
            createNotes(section, input, container, type);
         }
     }else{
         let section = document.querySelector("body");
         createNotes(section, input, container, type);
     }

     let noteContainer = document.querySelector(container);
     noteContainer.remove();
 
 
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
 
 
 function createNotes(section, input, container, type){
 
     let noteContainer = document.querySelector(container);

 
     let calls = section.querySelectorAll(input);
     calls.forEach( (call, index) => {
 
    
         let note = noteContainer.querySelector(call.getAttribute('href'));

         let back = note.querySelector(".footnote-back");
         if(back){
            back.remove();
         }
        
         let inline_note = document.createElement('span');
         inline_note.className = "pagedjs_note";
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