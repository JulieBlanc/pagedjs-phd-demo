import { Handler } from '../../paged.esm.js';

export class figuresHandler extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.figures = "figure"; // ← Select-r of figures to include in the list
        this.counterBefore = "Fig. ";
        this.counterAfter = ". ";
        this.list = true; // ← Set on true if you want a table of figure
        this.container = "#table-figures_container"; // ← The element inside you want generate the list of figuresg
        this.beforePageNumber = ""; // ← If you want to add some text before the page number ("page ", "p. ", ...) 
   
    }

    beforeParsed(content){

      /** pagedjs-design
         * Specific to pagedjs-design, overwrite values
        **/
      if(config.figures && config.figures.enabled){
        if(config.figures.selector){ this.figures = config.figures.selector; }
        if(config.figures.textBeforeCounters){ this.counterBefore  = config.figures.textBeforeCounters; }
        if(config.figures.textAfterCounters){ this.counterAfter  = config.figures.textAfterCounters; }
        if(config.figures.list){
            this.list = true;
        }else{
            this.list = false;
        }
        if(config.figures.list && config.figures.list[0]){
            if(config.figures.list[0].beforepagenumber || config.figures.list[0].beforepagenumber == ""){ 
                this.beforePageNumber  = config.figures.list[0].beforepagenumber;
            }
        }
       

      }
    /* */
   

        addFigNum({
            content: content,
            figures: this.figures,
            counterBefore: this.counterBefore,
            counterAfter: this.counterAfter
        });

        if(this.list){
            createList({
                content: content,
                figures: this.figures,
                container: this.container,
                beforePage: this.beforePageNumber
            })
        }
        
    
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

function createList(config){
    let content = config.content;
    let figures = content.querySelectorAll(config.figures);
    let container = content.querySelector(config.container);

    var ul = document.createElement('ul');
    ul.id = "list-fig-generated";
    if(config.beforePage){
        ul.style.setProperty('--before-page', '"' + config.beforePage + '"');
    }


    figures.forEach(function (figure, index) {
        let figcaption = figure.querySelector("figcaption");
        if(!figure.id){
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

