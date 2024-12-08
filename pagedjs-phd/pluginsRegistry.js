import { beforeHandler } from './plugins/beforeHandler.js';
import { createTocHandler } from './plugins/createToc/createToc.js';
import { fullPageHandler } from './plugins/fullPage.js';
import { moveElems } from './plugins/moveElems.js';
import { pagedjsEnded } from './plugins/reload-in-place.js';
import { sidenotes } from './plugins/sidenotes.js';
import { fixFootnotes } from './plugins/fix-footnotes.js';

// Export the array of plugin handlers
export function getHandlersAndCSS(config) {
  const handlers = [
    createTocHandler,
    beforeHandler,
    sidenotes,
    moveElems,
    fullPageHandler,
    fixFootnotes,
    pagedjsEnded
  ];

  // Export the array of CSS of the plugins (path from the "plugins" folder)
  let cssPlugins = ['footnotes.css'];

  // If TOC is enabled in the configuration, add its CSS file
  if (config.toc?.enabled) { 
    cssPlugins.push('createToc/createToc.css'); 
    handlers.push(createTocHandler);
  }

  return { handlers, cssPlugins };
}
