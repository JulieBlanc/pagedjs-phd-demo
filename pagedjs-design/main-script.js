import { Previewer, Handler } from './paged.esm.js';
import { handlers } from './pluginsRegistry.js';
import { preRenderHTML } from './preRenderHtmlRegistry.js';
import { moveFast } from './plugins/reload-in-place.js';


window.config = {};
window.addEventListener('load', async () => {

  console.log("// PAGEDJS DESIGN -------------- // ")
  // Load stylesheets and js
  loadCSS('/pagedjs-design/css/pagedjs.css');
  loadJS('/pagedjs-design/dependencies/csstree.min.js');


  // Load global configuration file
  try {
    const response = await fetch('/pagedjs-design-config.json');
    window.config = await response.json();
  } catch (error) {
    console.error('Error loading pagedjs-design-config.json:', error);
  }

  // Wait for preRenderHTML() to complete
  preRenderHTML();

  // Load the content for Paged.js
  const contentdoc = document.body.innerHTML;
  document.body.innerHTML = '';


  // Load custom handlers from the configuration file
  const handlerPaths = window.config.customHandlers.files.map(file => 
    "../" + window.config.customHandlers.directory + "/" + file
  );
  await loadCustomHandlers(handlerPaths);

  // Generate CSS paths from the configuration
  const cssPaths = window.config?.style?.files 
  ? window.config.style.files.map(file => window.config.style.directory + "/" + file)
  : ["/assets/css/style.css"];


  // Display Paged.js content and load panel events
  displayContent(contentdoc, cssPaths, window.config);
  moveFast();
});


/* -- PREVIEW & DISPLAY CONTENT -------------------------------------------
--------------------------------------------------------------------------- */

function displayContent(contentdoc, cssPaths, config) {
  const previewer = new Previewer();


  // Register default handlers
  handlers.forEach(handler => previewer.registerHandlers(handler));

  // Register custom handlers if any are loaded
  if (window.customHandlers) {
    window.customHandlers.forEach(handler => previewer.registerHandlers(handler));
  }

  // Add CSS for plugins
  cssPaths.push("/pagedjs-design/pre_render_html/createToc.css");
  if(window.config.notes && window.config.notes.type == "footnote"){
    cssPaths.push("/pagedjs-design/plugins/footnotes.css");
  }


  // console.log("FOOTNOTES");
  // console.log(config.footnote);

  // cssPaths.push("pagedjs-design/plugins/footnotes.css");


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

/* -- Add CSS & js files to the document ----------------------------------
--------------------------------------------------------------------------- */

function loadCSS(filename) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = filename;
  link.media = 'all';
  document.head.appendChild(link);
}

function loadJS(filename) {
  var script = document.createElement('script');
  script.src = filename;
  script.type = 'text/javascript';
  document.head.appendChild(script);
}