import { Handler } from '../paged.esm.js';
import { addcss } from './utils/addcss.js';

export class floatElems extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.selectorBottom = new Set();
        this.selectorTop = new Set();
        this.selectorNextPage = new Set();
        this.nextPageElem = new Set();

    }


   

    onDeclaration(declaration, dItem, dList, rule) {
        // Read customs properties
        if (declaration.property == "--pagedjs-float-elem") {
          // get selector of the declaration (NOTE: need csstree.js)
          let selector = csstree.generate(rule.ruleNode.prelude);
          // Push selector in correct set 
          if(declaration.value.value.includes("bottom")) {
            this.selectorBottom.add(selector);
          }else if(declaration.value.value.includes("top")) {
            this.selectorTop.add(selector);
          }else if(declaration.value.value.includes("next-page")) {
            this.selectorNextPage.add(selector);
          }
        }
     
    }


    afterParsed(parsed){
        // bottom
        for (let item of this.selectorBottom) {
            let elems = parsed.querySelectorAll(item);
            for (let elem of elems) {
                elem.classList.add("float-elem_bottom");
            }
        }

        // top
        for (let item of this.selectorTop) {
            let elems = parsed.querySelectorAll(item);
            for (let elem of elems) {
                elem.classList.add("float-elem_top");
            }
        }

        // next-page
        for (let item of this.selectorNextPage) {
          let elems = parsed.querySelectorAll(item);
          for (let elem of elems) {
              elem.classList.add("float-elem_next-page");
              elem.style.position = "absolute";
          }
      }
    } 


  afterPageLayout(pageElement, page, breakToken){
		let floatTopPage = pageElement.querySelector(".float-elem_top");
    let pageContent = pageElement.querySelector(".pagedjs_page_content");
    if(floatTopPage){
      pageContent.insertBefore(floatTopPage, pageContent.firstChild);
    }

    let floatBottomPage = pageElement.querySelector(".float-elem_bottom");
    if(floatBottomPage){
      pageContent.insertBefore(floatBottomPage, pageContent.firstChild);
      floatBottomPage.style.position = "absolute";
      floatBottomPage.style.bottom = "0px";
    }


    let nextPageElems = pageElement.querySelectorAll(".float-elem_next-page:not([data-processed])");
    nextPageElems.forEach((elem) => {
      this.nextPageElem.add(elem); 
      elem.setAttribute("data-processed", "true"); 
      elem.remove();
    });
	}


  onOverflow(overflow, rendered, bounds) {
    for (let elem of this.nextPageElem) {
      if (!elem.hasAttribute("data-handled")) {
        const copy = elem.cloneNode(true);
        copy.style.position = "relative";
        rendered.insertBefore(copy, rendered.firstChild);
        elem.setAttribute("data-handled", "true"); // Marque comme traité
      }
    }
    this.nextPageElem.clear();
  }


  
}



