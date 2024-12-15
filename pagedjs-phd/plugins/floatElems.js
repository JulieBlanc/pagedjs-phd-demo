import { Handler } from '../paged.esm.js';
import { addcss } from './utils/addcss.js';

export class floatElems extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.selectorRight = new Set();
        this.selectorBottom = new Set();
        this.selectorTop = new Set();
        this.selectorMoveElem  = new Set();
        this.selectorColInside2 = new Set();


    }


    beforeParsed(content){  
        console.log("floatElems --------- ")
    }

    onDeclaration(declaration, dItem, dList, rule) {
        // Read customs properties
        if (declaration.property == "--pagedjs-float-img") {
          // get selector of the declaration (NOTE: need csstree.js)
          let selector = csstree.generate(rule.ruleNode.prelude);
          // Push selector in correct set 
          if(declaration.value.value.includes("bottom")) {
            this.selectorBottom.add(selector);
          }else if(declaration.value.value.includes("top")) {
            this.selectorTop.add(selector);
          }
        }
     
    }


    afterParsed(parsed){
        // bottom
        for (let item of this.selectorBottom) {
            let elems = parsed.querySelectorAll(item);
            for (let elem of elems) {
                elem.classList.add("float-img_bottom");
            }
        }

        // top
        for (let item of this.selectorTop) {
            let elems = parsed.querySelectorAll(item);
            for (let elem of elems) {
                elem.classList.add("float-img_top");
            }
        }
    } 


    afterPageLayout(pageElement, page, breakToken){
		let floatTopPage = pageElement.querySelector(".float-img_top");
    let pageContent = pageElement.querySelector(".pagedjs_page_content");
    if(floatTopPage){
      pageContent.insertBefore(floatTopPage, pageContent.firstChild);
    }

    let floatBottomPage = pageElement.querySelector(".float-img_bottom");
    if(floatBottomPage){
      pageContent.insertBefore(floatBottomPage, pageContent.firstChild);
      floatBottomPage.style.position = "absolute";
      floatBottomPage.style.bottom = "0px";
    }

	}

 




  
}




    