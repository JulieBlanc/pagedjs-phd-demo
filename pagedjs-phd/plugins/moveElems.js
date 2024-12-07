import { Handler } from '../paged.esm.js';

export class moveElems extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.selectorMoveElem  = new Set();


    }

    onDeclaration(declaration, dItem, dList, rule) {
        
        if (declaration.property == "--x-move-elem") {  
          let selector = csstree.generate(rule.ruleNode.prelude);
            let value = declaration.value.value
            let doubleArray = [selector, value];
            this.selectorMoveElem.add(doubleArray);
            
      }
    }
    

    afterParsed(parsed){

        // ADD data to move elements
      for (let item of this.selectorMoveElem) {
        let elem = parsed.querySelector(item[0]);
        if(elem){
          elem.dataset.moveImg = item[1];
        }
      }

     moveElem(parsed);

   
    }


  
}




function  moveElem(parsed){
    let elems = parsed.querySelectorAll('[data-move-img]');
    for (let elem of elems) {
      let n = parseInt(elem.getAttribute('data-move-img'));
      let newPlace
      if(n < 0){
        newPlace = elem.previousSibling;
        if (newPlace.nodeType !== Node.ELEMENT_NODE) {
          newPlace = newPlace.previousSibling
        }
        n = n*-1 - 1;
        for(let i = 0; i < n; i++){
          newPlace = newPlace.previousSibling
          if (newPlace.nodeType !== Node.ELEMENT_NODE) {
            newPlace = newPlace.previousSibling
          }
        }
      }else{
        newPlace = elem.nextSibling;
        if (newPlace.nodeType !== Node.ELEMENT_NODE) {
          newPlace = newPlace.nextSibling;
        }
        for(let i = 0; i < n; i++){
          newPlace = newPlace.nextSibling;
          if (newPlace.nodeType !== Node.ELEMENT_NODE) {
            newPlace = newPlace.nextSibling;
          }
        }
      }
  
      newPlace.parentNode.insertBefore(elem, newPlace);
  
     
  // do next = next.nextSibling;     while(next && next.nodeType !== 1);
  
  
    }
  
    
  }