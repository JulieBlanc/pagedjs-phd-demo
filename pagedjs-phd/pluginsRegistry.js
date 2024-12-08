import { createTocHandler } from './plugins/createToc/createToc.js';
import { fullPageHandler } from './plugins/fullPage.js';
import { moveElems } from './plugins/moveElems.js';
import { pagedjsEnded } from './plugins/reload-in-place.js';
import { inlineNotesHandler } from './plugins/inlineNotes.js';
import { sidenotes } from './plugins/sidenotes.js';
import { fixFootnotes } from './plugins/fix-footnotes/fix-footnotes.js';

// Export the array of plugin handlers
export function getHandlersAndCSS(config) {
  const handlers = [
    moveElems,
    fullPageHandler,
    pagedjsEnded
  ];

  // Export the array of CSS of the plugins (path from the "plugins" folder)
  let cssPlugins = ['footnotes.css'];

  // createToc
  if (config.toc?.enabled) { 
    cssPlugins.push('createToc/createToc.css'); 
    handlers.push(createTocHandler);
  }

  // fix-footnotes
  if (config.notes?.enabled && config.notes?.type === "footnote") {
    handlers.push(inlineNotesHandler); 
    cssPlugins.push('fix-footnotes/fix-footnotes.css'); 
    handlers.push(fixFootnotes);  
  }



  // sidenotes
  if (config.notes?.enabled && config.notes?.type === "sidenote") {
    handlers.push(inlineNotesHandler);  
    handlers.push(sidenotes);  
  }


  return { handlers, cssPlugins };
}
