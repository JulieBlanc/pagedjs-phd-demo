import { Previewer, Handler } from './paged.esm.js';
import { getHandlersAndCSS } from './pluginsRegistry.js'; 
import { moveFast } from './plugins/reload-in-place.js';

window.config = {};
window.addEventListener('load', async () => {
  console.log("pagedjs-design loaded");
  
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

  // Load the content for Paged.js as a DocumentFragment
  const contentdoc = document.createDocumentFragment();
  while (document.body.firstChild) {
    contentdoc.appendChild(document.body.firstChild);
  }
  document.body.innerHTML = ''; // Clear the body

  // Get default handlers and CSS from pluginsRegistry.js
  const { handlers: defaultHandlers, cssPlugins } = getHandlersAndCSS(window.config);

  // Register custom handlers from the configuration file
  const handlerPaths = window.config.customHandlers.files.map(file => 
    window.config.customHandlers.directory + "/" + file
  );
  const customHandlers = await loadCustomHandlers(handlerPaths);

  // Combine default handlers and custom handlers
  const allHandlers = [...defaultHandlers, ...customHandlers];

  // Generate CSS paths from the configuration
  const cssPaths = window.config?.style?.files 
    ? window.config.style.files.map(file => window.config.style.directory + "/" + file)
    : ["/assets/css/style.css"];

  // Display Paged.js content 
  displayContent(contentdoc, cssPaths, allHandlers, cssPlugins);

  // reload-in-place
  moveFast();
});


/* -- PREVIEW & DISPLAY CONTENT -------------------------------------------
--------------------------------------------------------------------------- */


function displayContent(contentdoc, cssPaths, handlers, cssPlugins) {
  const previewer = new Previewer();

  handlers.forEach(handler => {
    previewer.registerHandlers(handler);
  });

  cssPlugins.forEach(css => {
    cssPaths.push("/pagedjs-phd/plugins/" + css);
  });

  previewer.preview(
    contentdoc,
    cssPaths,
    document.body
  );
}


/* -- Dynamically load custom handlers ------------------------------------
--------------------------------------------------------------------------- */

async function loadCustomHandlers(handlerPaths) {
  const customHandlers = [];
  for (const path of handlerPaths) {
    console.log(`Attempting to load handler from: ${path}`);
    try {
      const module = await import(path);
      console.log(`Module loaded successfully from ${path}:`, module);
      const handlerClass = module.default || module;
      if (handlerClass.prototype instanceof Handler) {
        customHandlers.push(handlerClass);
        console.log(`Valid handler loaded: ${path}`);
      } else {
        console.error(`The handler from ${path} is not a valid Handler.`);
      }
    } catch (error) {
      console.error(`Error loading handler from ${path}:`, error);
    }
  }
  console.log(`Loaded custom handlers:`, customHandlers);
  return customHandlers;
}


/* -- Function to add CSS & JS files to the document ----------------------------------
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
