// preRenderHtmlRegistry.js
import { inlineNotes } from './pre_render_html/inlineNotes.js';
import { createToc } from './pre_render_html/createToc.js';

// Exporter un tableau de handlers
export function preRenderHTML(){
    
   

    

     // Inline notes ------------------------
     if (config.notes && config.notes.enabled) {
        inlineNotes({
            section: config.notes.chapters || false,
            input: config.notes.callInput || ".footnote",
            containerNotes: config.notes.containerNotes || "#footnotes",
            type: config.notes.type || "footnote"
            
        });
	}





    if (config.toc && config.toc.enabled) {
        createToc({
            content: document.querySelector("body"),
            tocElement: config.toc.container, 
            titleElements: config.toc.titles || ['h1', 'h2'],
            tocStyle: config.toc.style || 'none',
            tocCounters: config.toc.counters || "false",
            before: config.toc.beforepagenumber || ""
        });
    }
};




