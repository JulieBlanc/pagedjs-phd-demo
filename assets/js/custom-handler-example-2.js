// PreviewHandler.js
import { Handler } from '/pagedjs-phd/paged.esm.js';

export default class myCustomHandler2 extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
      }

  
    afterPageLayout(pageElement, page, breakToken) {
      if(pageElement.id == "page-1"){
        console.log("[pagedjs-phd] Example custom handler 2 with afterPageLayout hook (see js/custom-handler-example-2.js")

      }
    }
}

