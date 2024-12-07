// PreviewHandler.js
import { Handler } from '/pagedjs-design/paged.esm.js';

export default class myCustomHandler2 extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
      }

  
    afterPageLayout(pageElement, page, breakToken) {
      if(pageElement.id == "page-1"){
        console.log("[pagedjs-design] Example custom handler 2 with afterPageLayout hook (see js/custom-handler-example-2.js")

      }
    }
}

