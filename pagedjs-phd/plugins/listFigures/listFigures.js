import { Handler } from '../../paged.esm.js';

export class createListFigures extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.container = "#table-figures_container"; // ← The element inside you want generate the list of figures
        this.figures = "figure"; // ← Selectpr of figures to include in the list
        this.counterBefore = "Fig. ";
        this.counterAfter = ". ";
        this.leaders = false;  // ← Set on true if you want leaders
        this.counters = false; // ← Set on true if you want counters before titles 
        this.beforePageNumber = ""; // ← If you want to add some text before the page number ("page ", "p. ", ...) 
    
    }

    beforeParsed(content){

        console.log("listFigures ---------- ")
      /** pagedjs-design
         * Specific to pagedjs-design, overwrite values
        **/
      if(config.figures && config.figures.enabled){
        console.log("CONFIG OVERWRITE");
        if(config.figures.selector){ this.figures = config.figures.selector; }
        if(config.figures.textBeforeCounters){ this.counterBefore  = config.figures.textBeforeCounters; }
        if(config.figures.textAfterCounters){ this.counterAfter  = config.figures.textAfterCounters; }

      }
    /* */
   

    //   createToc({
    //       content: content,
    //       container: config.toc.container, 
    //       titleElements: this.tocTitles,
    //       leaders: this.leaders,
    //       counters: this.counters,
    //       before: this.beforePageNumber
    //   });

        addFigNum({
            content: content,
            figures: this.figures,
            counterBefore: this.counterBefore,
            counterAfter: this.counterAfter
        });

        createList({
            content: content,
            figures: this.figures,
            container: this.container
        })
    
    
    }
    
}



function addFigNum(config){

    let content = config.content;
    let figures = content.querySelectorAll(config.figures);

    figures.forEach(function (figure, index) {
        let figcaption = figure.querySelector("figcaption");
        let num = index + 1;
        var span = document.createElement('span');
        span.classList.add("fig-num");
        span.innerHTML = config.counterBefore + num + config.counterAfter ;
        figcaption.prepend(span);
    });

}

function  createList(config){
    let content = config.content;
    let figures = content.querySelectorAll(config.figures);
    let container = content.querySelector(config.container);

    console.log(container);
    var ul = document.createElement('ul');
    ul.id = "list-fig-generated";
 

    figures.forEach(function (figure, index) {
        let figcaption = figure.querySelector("figcaption");
        if(!figure.id){
            console.log(figure);
            let num = index + 1;
            figure.id = "figure-listed-" + num;
        }
        var li = document.createElement('li');
        li.classList.add("elem-fig")
        li.innerHTML = '<a href="#' + figure.id + '">' + figcaption.innerHTML + '</a>';
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

