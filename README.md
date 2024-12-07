# PHD demo

Demonstration of a thesis workflow based on pandoc and paged.js

(need more documentation)



## Requierment

- [Pandoc](https://pandoc.org/), the universal converter
- [Better Bibtex for Zotero](https://retorque.re/zotero-better-bibtex/) for generating citation keys
- Code-writing software like [VS codium](https://vscodium.com/)
- Local server (install the Live server extension in VS Codium for example)
- Web browser (caution: there may be differences in rendering between browsers)





## Use

- Every time you change something in the markdown file, use the Pandoc command to regenerate yout html file.
- Launch Live server to see the result in the browser.
- Go to → `localhost:5500/output/print.html`




## Pandoc commands 

Create print.html file (all content)

```
pandoc src/cover.md src/abstract.md src/toc.md src/chapters/*.md --template=assets/templates/print.html --metadata-file meta.yaml --lua-filter=assets/update-image-paths.lua --citeproc -o output/print.html

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

- `chapters` → the markdown files of each chapter, please respect the denomination (`chapter-01.md`, `chapter-02.md`, etc.)
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

### output/

Create this directory if doesn’t exist, before launching Pandoc command. It’s where your content is generate



### pagedjs-design/

A ready-to-start Paged.js environnement with some preloaded plugins and interface to see pages. Licence: MIT licence, Julie Blanc.

Normaly, you don’t need to touch anything here.



### pagedjs-design-config.json

You can configure some paged.js feature in this file (works only with the pagedjs-design environnement):

#### Upadte the path of your stylesheet

```json
 "style": {
        "directory": "/assets/css", // path of the directory
        "files": [
            "style.css"  // files of the style, you can add multiple ones      
        ]
    },
```



#### Table of content

```json
"toc": {
        "enabled": true, // Enables or disables the table of contents display
        "container": "#toc-here", // Specifies the container element where the table of contents will be inserted (find it in toc.md)
        "titles": [
           ".chapter h2", 
           ".chapter h3" 
						// List of title levels to include in the table of contents; additional levels can be added or removed
        ],
        "style": "leaders", // Default visual style of the toc, only "leaders" option is avaible, if you don’t want it, write  "false"
        "counters": "true", // Add counters before titles (if you dont’t want, set to "false")
        "beforepagenumber": "" // Customizes text or symbols to display before the page number (if applicable)
     },
```



#### Notes

```json
"notes": {
        "enabled": true, // Enables or disables the notes feature (it will inline the notes in list from Pandox)
        "type": "footnote", // Specifies the type of notes: "footnote" or "sidenote"
        "position": "outside", // Determines the placement of the sitenotes: "outside", "inside", "left", "right"
        "chapters": ".chapter", // where the notes restart to 1
        "callInput": ".footnote-ref", // Identifies the elements used to reference notes in the text
        "containerNotes": "#footnotes" // Specifies the container element where the notes are displayed by pandoc (this element is deleted after rendering)
    }
```







### To do

- bibliography at the end
- sidenotes
- web version
- metadata in pandoc template
- change name of pagedjs-design to pagedjs-phd
