import { Handler } from '../paged.esm.js';

export class pandocTransform extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    beforeParsed(content){

        // UNLIST FIGURES

        let classImg =  "unlisted";
        let images = content.querySelectorAll("img." + classImg);
        images.forEach(function (img, index) {
            console.log(img);
            let parentFig = img.closest("figure");
            if(!parentFig.classList.contains(classImg)){
                parentFig.classList.add(classImg);
            }
            img.classList.remove(classImg)
        });


        // Move toc create by pandoc
        let tocPandoc = content.querySelector("#toc-pandoc");
        let tocContainer = content.querySelector("#toc_container");
        if(tocPandoc){
            tocContainer.appendChild(tocPandoc);
        }
        


        // Move bibliography create by pandoc
        let ref = content.querySelector("#refs");
        let biblioContainer = content.querySelector("#bibliography_container");
        if(ref){
            biblioContainer.appendChild(ref);
        }
        

    }
}