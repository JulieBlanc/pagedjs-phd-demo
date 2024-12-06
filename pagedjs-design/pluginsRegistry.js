// pluginsRegistry.js
import { beforeHandler } from './plugins/beforeHandler.js';
import { fullPageHandler } from './plugins/fullPage.js';
import { moveElems } from './plugins/moveElems.js';
import { pagedjsEnded } from './plugins/reload-in-place.js';
import { sidenotes } from './plugins/sidenotes.js';
import { fixFootnotes } from './plugins/fix-footnotes.js';


// Exporter un tableau de handlers
export const handlers = [
  beforeHandler,
  sidenotes,
  moveElems,
  fullPageHandler,
  fixFootnotes,
  pagedjsEnded
];
