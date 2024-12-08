// pluginsRegistry.js
import { beforeHandler } from './plugins/beforeHandler.js';
import { createTocHandler } from './plugins/createToc/createToc.js';
import { fullPageHandler } from './plugins/fullPage.js';
import { moveElems } from './plugins/moveElems.js';
import { pagedjsEnded } from './plugins/reload-in-place.js';
import { sidenotes } from './plugins/sidenotes.js';
import { fixFootnotes } from './plugins/fix-footnotes.js';


// Export the array of plugin handlers
export const handlers = [
  createTocHandler,
  beforeHandler,
  sidenotes,
  moveElems,
  fullPageHandler,
  fixFootnotes,
  pagedjsEnded
];

// Export the array of CSS of the plugins (path from the "plugins" folder)
export const cssPlugins = [
  'createToc/createToc.css',
  'footnotes.css'
]