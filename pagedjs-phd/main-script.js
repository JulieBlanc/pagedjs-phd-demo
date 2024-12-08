import { Previewer, Handler } from './paged.esm.js';
import { getHandlersAndCSS } from './pluginsRegistry.js'; 
import { preRenderHTML } from './preRenderHtmlRegistry.js';
import { moveFast } from './plugins/reload-in-place.js';

window.config = {};
window.addEventListener('load', async () => {
  console.log("// PAGEDJS DESIGN -------------- // ");
  
  // Load stylesheets and JS
  loadCSS('/pagedjs-phd/css/pagedjs.css');
  loadJS('/pagedjs-phd/dependencies/csstree.min.js');

  // Load global configuration file
  try {
    const response = await fetch('/pagedjs-phd-config.json');
    window.config = await response.json();
  } catch (error) {
    console.error('Error loading pagedjs-phd-config.json:', error);
  }

  // Wait for preRenderHTML() to complete
  preRenderHTML();

  // Load the content for Paged.js as a DocumentFragment
  const contentdoc = document.createDocumentFragment();
  while (document.body.firstChild) {
    contentdoc.appendChild(document.body.firstChild);
  }
  document.body.innerHTML = ''; // Clear the body

  // Appeler la fonction getHandlersAndCSS avec la config une fois chargée
  const { handlers, cssPlugins } = getHandlersAndCSS(window.config);

  // Register custom handlers from the configuration file
  const handlerPaths = window.config.customHandlers.files.map(file => 
    "../" + window.config.customHandlers.directory + "/" + file
  );
  await loadCustomHandlers(handlerPaths);

  // Generate CSS paths from the configuration
  const cssPaths = window.config?.style?.files 
    ? window.config.style.files.map(file => window.config.style.directory + "/" + file)
    : ["/assets/css/style.css"];

  // Display Paged.js content and load panel events
  displayContent(contentdoc, cssPaths, handlers, cssPlugins);

  // Activate fast reload
  moveFast();
});


/* -- PREVIEW & DISPLAY CONTENT -------------------------------------------
--------------------------------------------------------------------------- */

function displayContent(contentdoc, cssPaths, handlers, cssPlugins) {
  const previewer = new Previewer();

  // Register default handlers (plugins)
  handlers.forEach(handler => previewer.registerHandlers(handler));

  // Register css for default handlers (plugins)
  cssPlugins.forEach(css => cssPaths.push("/pagedjs-phd/plugins/" + css));

  // Preview the content using Paged.js
  previewer.preview(
    contentdoc,
    cssPaths,
    document.body
  );
}

/* -- Dynamically load custom handlers ------------------------------------
--------------------------------------------------------------------------- */

async function loadCustomHandlers(handlerPaths) {
  window.customHandlers = [];
  for (const path of handlerPaths) {
    try {
      const module = await import(path);
      const handlerClass = module.default || module;

      // Ensure the handlerClass is a valid Handler class
      if (handlerClass.prototype instanceof Handler) {
        window.customHandlers.push(handlerClass);
      } else {
        console.error(`The handler from ${path} is not a valid Handler.`);
      }
    } catch (error) {
      console.error(`Error loading handler from ${path}:`, error);
    }
  }
}

/* -- Add CSS & JS files to the document ----------------------------------
--------------------------------------------------------------------------- */

function loadCSS(filename) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = filename;
  link.media = 'all';
  document.head.appendChild(link);
}

function loadJS(filename) {
  const script = document.createElement('script');
  script.src = filename;
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
