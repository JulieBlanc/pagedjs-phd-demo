import { Handler } from '../../paged.esm.js';

export class createTocHandler extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.tocContainer = "#toc"; // ← The element inside you want generate the table of content
        this.tocTitles = ["h2", "h3"]; // ← List of title levels to include in the table of contents
        this.leaders = false;  // ← Set on true if you want leaders
        this.counters = false; // ← Set on true if you want counters before titles 
        this.beforePageNumber = ""; // ← If you want to add some text before the page number ("page ", "p. ", ...) 
    
    }

    beforeParsed(content){
      /** pagedjs-design
         * Specific to pagedjs-design, overwrite values
        **/
      if(config.toc && config.toc.enabled){
        if(config.toc.container){ this.tocContainer  = config.toc.container; }
        if(config.toc.titles){ this.tocTitles  = config.toc.titles; }
        if(config.toc.leaders || config.toc.leaders === false){ this.leaders  = config.toc.leaders; }
        if(config.toc.counters || config.toc.counters === false){ this.counters  = config.toc.counters; }
        if(config.toc.beforepagenumber || config.toc.beforepagenumber == ""){ this.beforePageNumber  = config.toc.beforepagenumber; }
      }
    /* */
   

      createToc({
          content: content,
          container: config.toc.container, 
          titleElements: this.tocTitles,
          leaders: this.leaders,
          counters: this.counters,
          before: this.beforePageNumber
      });
    
    
    }
    
}


function createToc(config) {

 
    const content = config.content;
    const tocElement = config.container;
    const titleElements = config.titleElements;


  
  
    let tocElementDiv = content.querySelector(tocElement)
    if(!tocElementDiv) return console.warn('couldn’t start the toc')
    tocElementDiv.innerHTML = ''
    let tocUl = document.createElement('ul')
    tocUl.id = 'list-toc-generated'

    if(config.leaders){
      tocUl.setAttribute('data-toc-style', 'leaders');
    }
    if(config.counters){
      tocUl.setAttribute('data-toc-set-counter', 'true');
    }
    if(config.before){
      tocUl.style.setProperty('--toc-before-page', '"' + config.before + '"');
    }
 
   
  
  
    tocElementDiv.appendChild(tocUl)
  
    // add class to all title elements
    let tocElementNbr = 0
    for (var i = 0; i < titleElements.length; i++) {
      let titleHierarchy = i + 1
      let titleElement = content.querySelectorAll(titleElements[i])
  
      titleElement.forEach(function (element) {
        // check if shouldbe shown
        if (
          !element.classList.contains('toc-ignore')
        ) {
          // add classes to the element
          element.classList.add('title-element')
          element.setAttribute('data-title-level', titleHierarchy)
  
          // add an id if doesn't exist
          tocElementNbr++
  
          if (element.id == '') {
            element.id = 'title-element-' + tocElementNbr
          }
          let newIdElement = element.id
        }
      })
    }
  
    // create toc list
    let tocElements = content.querySelectorAll('.title-element')
  
    for (var i = 0; i < tocElements.length; i++) {
      let tocElement = tocElements[i]
  
      let tocNewLi = document.createElement('li')
  
      // Add class for the hierarcy of toc
      tocNewLi.classList.add('toc-element')
      tocNewLi.classList.add('toc-element-level-' + tocElement.dataset.titleLevel)
  
      let classes = [
        ...(tocElement.className ? tocElement.className.split(' ') : []),
        ...(tocElement.closest('section')?.className ? tocElement.closest('section')?.className.split(' ') : []),
      ];
      
      classes.forEach((meta) => {
        if (!meta || meta === 'title-element') return;
        tocNewLi.classList.add(`toc-${meta}`);
      });
  
      //get the exisiting class
      // Keep class of title elements
      let classTocElement = tocElement.classList
      for (var n = 0; n < classTocElement.length; n++) {
        if (classTocElement[n] != 'title-element') {
          tocNewLi.classList.add(classTocElement[n])
        }
      }
  
      // Create the element
      tocNewLi.innerHTML =
        '<a href="#' + tocElement.id + '">' + tocElement.innerHTML + '</a>'
      tocUl.appendChild(tocNewLi)
    }
  }
  