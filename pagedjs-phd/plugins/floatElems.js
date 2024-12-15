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

	}




    // positionning NEXT PAGE -------------------

    renderNode(clone, node) {
      if (node.nodeType == 1 && node.classList.contains("float-elem_next-page")) {
        console.log(getAllParents(node));
        console.log(buildCssSelector(node));
        console.log(cleaningCssSelector(node));
        clone.remove();
        this.nextPageElem.add(node);
        
      }
    } 

    onPageLayout(page, Token, layout) {
      for (let elem of this.nextPageElem) {
        page.insertBefore(elem, page.firstChild);
      }
      this.nextPageElem.clear();
    }


  
}



// FONCTIONS --------------------------------------------------------------------------

// Array of the parents
function getAllParents(element) {
  let parents = [];
  let current = element;

  while (current.parentNode) {
      parents.push(current.parentNode);
      current = current.parentNode;
  }

  return parents;
}


// Function to build the CSS selector from the parents.
function buildCssSelector(element) {
  const parents = getAllParents(element);
  let selector = [];

  for (let i = parents.length - 1; i >= 0; i--) {
      const parent = parents[i];
      let parentSelector = parent.nodeName.toLowerCase();

      if (parent.id) {
          parentSelector += `#${parent.id}`;
      }

      if (parent.className) {
          parentSelector += `.${parent.className.split(' ').join('.')}`;
      }

      selector.push(parentSelector);
  }

  // Selector of the element
  // let elementSelector = element.nodeName.toLowerCase();
  // if (element.id) {
  //     elementSelector += `#${element.id}`;
  // }
  // if (element.className) {
  //     elementSelector += `.${element.className.split(' ').join('.')}`;
  // }
  // selector.push(elementSelector);

  return selector.join(' > ');
}

// delete dociment fragment
function cleaningCssSelector(element) {
  let string = buildCssSelector(element);
  string = string.replace('#document-fragment > ', '');
  string = string.replace('#document-fragment', ''); // if there is no parents
  return string;
}