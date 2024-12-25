# PHD demo

Demonstration of a thesis workflow based on pandoc and paged.js

(need more documentation)



## Requierment

- [Pandoc](https://pandoc.org/), the universal converter
- [Better Bibtex for Zotero](https://retorque.re/zotero-better-bibtex/) for generating citation keys
- Code-writing software like [VS codium](https://vscodium.com/)
- Local server (install the Live server extension in VS Codium for example)
- Web browser (caution: there may be differences in rendering between browsers)


## Use

- Every time you change something in the markdown file, use the Pandoc command to regenerate yout html file.
- Launch Live server to see the result in the browser.
- Go to → `localhost:5500/output/print.html`




## Pandoc commands 

Create print.html file (all content)


```
pandoc src/cover.md src/abstract.md src/chapters/*.md src/credits.md --template=assets/templates/print.html --metadata-file meta.yaml --lua-filter=assets/add_section_ids.lua --lua-filter=assets/update-image-paths.lua --citeproc -o output/print.html
```

```
for file in src/cover.md src/abstract.md src/toc.md; do
  [ -f "$file" ] || echo "" > "$file.tmp"
done

pandoc $(for file in src/cover.md src/abstract.md src/toc.md; do [ -f "$file" ] && echo "$file" || echo "$file.tmp"; done) src/chapters/*.md \
  --template=assets/templates/print.html \
  --metadata-file=meta.yaml \
  --lua-filter=assets/add_section_ids.lua \
  --lua-filter=assets/update-image-paths.lua \
  --citeproc \
  -o output/print.html

# Nettoyage des fichiers temporaires
rm -f src/*.tmp
```


Create a file for each printed chapter

```
for file in src/chapters/*.md; do    
	filename=$(basename -- "$file" .md)    
	pandoc src/cover.md "$file" --template=assets/templates/print.html --metadata-file meta.yaml --lua-filter=assets/update-image-paths.lua --citeproc -o "output/${filename}-print.html" 
	done
```



## Files organisation





### src/

Folder with all your content. 

- `chapters` → the markdown files of each chapter, please respect the denomination for the chapters (`chapter-01.md`, `chapter-02.md`, etc.)
- `toc.md` → a special file for the generated table of content with paged.js
- `cover.md`, `abstract.md`, `acknowledgements.md` → qdd directly the mardown files you need (don’t forget to add this style to your pandoc command line)
- `images/` → put here the images of your content
- `biblio/` 
  - `biblio.bib` ' → the file of your bibliography export from zotero
  - `chicago-full-note.csl` → choosen citation style in Citation Style Language (CSL). See here the complete list of style you can choose → https://github.com/citation-style-language/styles (download the correct one and replace it)

### `meta.yml`

File with metadata that you can reuse in pandoc template (title, author, affiliation) ... + path to your bibliographic files (maybe you need to update if you change the citation style)


### assets/

- `css/` → folder with your css separete in differents modules. If you want to add a module, don’t forget to import it in `style.css`, import also the style sheet of your fonts like this:

  ```
  @import "../fonts/Brill_webfont/stylesheet.css";
  ```

- `fonts/` → add this folder with your fonts

- `template/` → templates HTML for Pandoc

- `update-image-paths.lua` → a script for Pandoc to update the image file paths by standardizing them to the base directory (`../src/images/`)

- `js/` → Folder where you can add your custom Javascript. Use [handlers](https://pagedjs.org/documentation/10-handlers-hooks-and-custom-javascript/) from Paged.js. Don’t forget to load your custom file in `pagedjs-phd-config.json`

### output/

Create this directory if doesn’t exist, before launching Pandoc command. It’s where your content is generate



### pagedjs-phd/

A ready-to-start Paged.js environnement with some preloaded plugins and interface to see pages. Licence: MIT licence, Julie Blanc.

Normaly, you don’t need to touch anything here.



### pagedjs-phd-config.json

You can configure some paged.js feature in this file (works only with the pagedjs-phd environnement):

#### Update the path of your stylesheet

```json
 "style": {
        "directory": "/assets/css",
        "files": [
            "style.css"   
        ]
    },
```

- `"directory"` → path of the directory
- `"files"` → files of the style, you can add multiple ones    


#### Table of content

```json
"toc": {
    "enabled": true,
    "container": "#toc-here",
    "titles": [
        ".chapter h2", 
        ".chapter h3"
    ],
    "style": "leaders",
    "counters": "true",
    "beforepagenumber": "" 
}
```

- `"enabled": true` → Enables or disables the table of contents display 
- `"container"` → Specifies the container element where the table of contents will be inserted (find it in toc.md)
- `"titles"` → List of title levels to include in the table of contents; additional levels can be added or removed / by default: "h2", "h3"
- `"style": "leaders"` → Default visual style of the toc, only "leaders" option is avaible, if you don’t want it, write "false" / by default: false
- `"counters": "true"` → Add counters before titles (if you dont’t want, set to "false") / by default: false
- `"beforepagenumber"` → Customizes text or symbols to display before the page number (if applicable)


#### Notes

Determine if you want footnotes

```json
"notes": {
    "enabled": true,
    "type": "footnote",
    "resetCounter": ".chapter",
    "callInput": ".footnote-ref", 
    "containerNotes": "#footnotes"
}
```

- `"enabled": true` →  Enables or disables the notes feature (it will inline the notes in list from Pandoc)
- `"type"` → Specifies the type of notes. Option avaible: `"footnote"`, `"sidenote"`, `"margin-notes"`
- `"resetCounter"`→ CSS element where the counter note reset (if you want to reset on the page: "page", reset on the page work only  with footnotes)
- `"callInput"` → Identifies the elements used to reference notes in the text / by default: ".footnote-ref"
- `"containerNotes"` → Specifies the container element where the notes are displayed by pandoc (this element is deleted after rendering) / by default: "#footnotes" 


It’s also possible to make sidenotes (`"type": "sidenote"`) or margin notes (`"type": "margin-note"`) and specify some parameters:


```json
"notes": {
    "enabled": true, 
    "type": "sidenote", 
    "resetCounter": ".chapter", 
    "callInput": ".footnote-ref", 
    "containerNotes": "#footnotes", 
    "params": { 
        "position": "outside", 
        "align": ".first-paragraph" 
    }
}
```

- `"position"` → Determines the placement of the notes in the page: `"outside"`, `"inside"`, `"left"`, `"right"` / default: `"outside"`
- `"align"` → Determines the top alignment of the sidenote relative to this element (the first on the page) / works only for sidenotes


#### Custom Script (handlers)

You can add your custom Javascript. For this, use [handlers](https://pagedjs.org/documentation/10-handlers-hooks-and-custom-javascript/) from Paged.js [(see documentation)](https://pagedjs.org/documentation/10-handlers-hooks-and-custom-javascript/). Add your files in `/assets/js/` and load your custom file like this:


```json
"customHandlers": {
    "directory": "/assets/js", 
    "files": [
        "custom-handler-example-1.js",
        "custom-handler-example-2.js" 
    ]
}
```

- `"directory"` → path of the directory
- `"files"` → yout js files with custom handlers   


Template to create handlers with paged.esm.js (module ECMAScript.):

```javascript
import { Handler } from '/pagedjs-phd/paged.esm.js';

export default class myCustomHandler extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    beforeParsed(content){
        // ...
    }
}
```


### To do

- endnote (to section)
- web version
- metadata in pandoc template for cover ?
- ajouter une page si ce n’est pas un multiple de 2 ou 4
