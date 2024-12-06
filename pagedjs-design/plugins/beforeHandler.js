// PreviewHandler.js
import { Previewer, Handler } from '../paged.esm.js';

export class beforeHandler extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
      }

  
  beforeParsed(content) {
    // when paged.esm.js will be repaired (content is a string)
  
  }
}