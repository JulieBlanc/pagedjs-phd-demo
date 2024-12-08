// PreviewHandler.js
import { Handler } from '/pagedjs-phd/paged.esm.js';

export default class myCustomHandler1 extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
      }

      beforeParsed(content){
        console.log(content);

      }

  
  afterParsed(content) {
    console.log("[pagedjs-phd] Example custom handler 1 with afterParsed hook (see js/custom-handler-example-2.js")
  
  }
}


