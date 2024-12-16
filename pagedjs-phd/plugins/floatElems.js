import { Handler } from '../paged.esm.js';
import { addcss } from './utils/addcss.js';

export class floatElems extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.selectorBottom = new Set();
        this.selectorTop = new Set();
        this.selectorNextPage = new Set();
        this.nextPageElem = new Set();
        this.nextPageElemTemp = new Set();
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
          }
      }
    } 



  // positionning TOP & BOTTOM -------------------

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

    for (let elem of this.nextPageElemTemp) {
      let parent = pageElement.querySelector(elem.parentSelector);
      let node = elem.elem;
      if(parent){
        parent.insertBefore(node, parent.firstChild);
      }
    }
    this.nextPageElemTemp.clear();
    

	}




    // positionning NEXT PAGE -------------------

    renderNode(clone, node) {
      if (node.nodeType == 1 && node.classList.contains("float-elem_next-page")) {
        clone.remove();
        this.nextPageElem.add({ elem: node, parentSelector: buildCssSelector(node.parentNode) });
      }
    } 

    onPageLayout(page, Token, layout) {
      for (let elem of this.nextPageElem) {
        page.insertBefore(elem.elem, page.firstChild);
        this.nextPageElemTemp.add(elem);
        console.log(this.nextPageElemTemp);
      }
      this.nextPageElem.clear();
    }

    


  
}



// FONCTIONS --------------------------------------------------------------------------

// Function to build the CSS selector from the element and its parents
function buildCssSelector(element) {
  let selector = [];
  let current = element;

  while (current) {
      let currentSelector = current.nodeName.toLowerCase();

      if (current.id) {
          currentSelector += `[data-id="${current.id}"]`;
      }

      if (current.className) {
          currentSelector += `.${current.className.split(' ').join('.')}`;
      }

      selector.unshift(currentSelector);
      current = current.parentNode;
  }

  selector = selector.join(' > ');
  selector = selector.replace(/#document-fragment( > )?/g, ''); // Clean the CSS selector by removing '#document-fragment'

  return selector;
}