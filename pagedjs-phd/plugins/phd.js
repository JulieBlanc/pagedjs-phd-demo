import { Handler } from '../paged.esm.js';

export class phd extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    beforeParsed(content){
        

        let defaultItemsEn = ['cover', 'abstract', 'table of content', 'table of figures', 'foreword', 'introduction', 'chapters', 'conclusion', 'bibliography', 'glossary', 'appendix', 'acknowledgements', 'credits'];
        let defaultItemsFr = ['couverture', 'résumé', 'table des matières', 'table des figures', 'avant-propos', 'introduction', 'chapitres', 'conclusion', 'bibliographie', 'glossaire', 'appendices', 'remerciements', 'crédits'];
        let items;





        if(config.menu){
            if(config.menu.lang == "fr"){
                items = defaultItemsFr;
            }else{
                items = defaultItemsEn;
            }

            if(config.menu.items){
                items = config.menu.items;
            }

            let arrayItemsId = []; 

            items.forEach(function (item, index) {
                arrayItemsId.push(generateId(item));
                
                let itemTitle = generateTitle(item);
            });

            console.log(arrayItemsId);

            reorderSections(content, arrayItemsId);


            
            
        }


    }
}



function generateId(title) {
    return title
        .toLowerCase()                     // Convertir en minuscules
        .normalize('NFD')                  // Normaliser pour séparer les accents des lettres
        .replace(/[\u0300-\u036f]/g, '')   // Supprimer les accents
        .replace(/[^\w\s-]/g, '')          // Retirer les caractères non alphanumériques (sauf tirets et espaces)
        .trim()                            // Supprimer les espaces au début et à la fin
        .replace(/\s+/g, '-');             // Remplacer les espaces par des tirets
}

function generateTitle(id) {
    return id       
        .replace(/^\w/, char => char.toUpperCase());
}




function reorderSections(content, order) {
    const container = content; 
    const allSections = Array.from(container.children); // Get all initial sections as an array
    const processedIds = new Set(); // Keep track of IDs that have already been processed
    const fragment = document.createDocumentFragment(); // Temporary container for reordering sections

    // Function to create a default section if it doesn't exist (only for table of content and table of figures)
    function createSection(id, title, contentDivId) {
        const section = document.createElement('section'); 
        section.id = `section_${id}`; 
        section.innerHTML = `<h1>${title}</h1><div id="${contentDivId}"></div>`; 
        return section; 
    }

    // Table of exceptions for specific IDs and behaviors
    const exceptions = {
        'table-of-content': { id: 'table-of-content', title: 'Table of content', divId: 'toc' }, 
        'table-of-figures': { id: 'table-of-figures', title: 'Table of figures', divId: 'table-figures' }, 
        'chapters': { idPrefix: 'chapter', multi: true }, 
        'bibliography': { id: 'refs' } 
    };

    // Iterate over the specified order
    order.forEach(id => {
        let section;

        if (exceptions[id]) {
            const exception = exceptions[id];

            // Handle specific exceptions
            if (exception.multi) {
                // Handle "chapters" by finding all sections with IDs starting with the prefix
                const matchingSections = allSections.filter(el =>
                    el.id && el.id.startsWith(exception.idPrefix)
                );
                matchingSections.forEach(el => {
                    fragment.appendChild(el); // Add each matching section to the temporary container
                    processedIds.add(el.id); // Mark the section as processed
                });
                return; // Move to the next item in the order
            } else if (exception.id) {
                // Handle a single exception by ID
                section = content.getElementById(exception.id);
                if (!section && exception.divId) {
                    section = createSection(exception.id, exception.title, exception.divId);
                }
            }
        } else {
            // For regular sections, find them by ID
            section = content.getElementById(id);
            console.log('id=' + id); 
            console.log(section); 
        }

        if (section) {
            fragment.appendChild(section); // Add the section to the temporary container
            processedIds.add(section.id); // Mark the section as processed
        } else {
            console.warn(`${id} does not exist. Please create the corresponding md file.`);
        }
    });

    // Add remaining sections at the end
    allSections
        .filter(el => !processedIds.has(el.id)) // Filter out sections that have already been processed
        .forEach(el => fragment.appendChild(el)); // Add remaining sections to the temporary container

    // Reinsert the fragment into the main container
    container.innerHTML = ''; 
    container.appendChild(fragment); 
}
