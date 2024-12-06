# PHD demo

Demonstration of a thesis workflow based on pandoc and paged.js


## Commandes pandoc 

Créer le fichier print.html (tout le contenu)

```
pandoc src/cover.md src/abstract.md src/toc.md src/chapters/*.md --template=assets/templates/print.html --metadata-file meta.yaml --lua-filter=assets/update-image-paths.lua --citeproc -o output/print.html

```

Créer un fichier pour chaque chapitre imprimé

```
for file in src/chapters/*.md; do    
	filename=$(basename -- "$file" .md)    
	pandoc src/cover.md "$file" --template=assets/templates/print-chapter.html --metadata-file meta.yaml --lua-filter=assets/update-image-paths.lua --citeproc -o "output/${filename}-print.html" 
	done
```






