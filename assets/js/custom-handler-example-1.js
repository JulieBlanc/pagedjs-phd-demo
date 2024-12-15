import { Handler } from '/pagedjs-phd/paged.esm.js';

export default class myCustomHandler1 extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
      }

      beforeParsed(content){
        console.log("[CUSTOM] Example of custom js to transform your DOM before Paged.js is launch (see assets/js/custom-handler-example-1.js")

        // Transform here your DOM before Pageds.js is launch
        // Example: add class "title-h2" to all h2 element

        let titles = content.querySelectorAll("h2");
        titles.forEach(function (title, index) {
          title.classList.add("title-h2");
        });
  

      }


}


