commande pandoc:

```
for file in src/chapters/*.md; do    
	filename=$(basename -- "$file" .md)    
	pandoc src/cover.md "$file" --template=assets/templates/print-chapter.html --metadata-file meta.yaml --lua-filter=assets/update-image-paths.lua --citeproc -o "output/${filename}-print.html" 
	done
```


```
pandoc src/cover.md src/abstract.md src/toc.md src/chapters/*.md --template=assets/templates/print.html --metadata-file meta.yaml --lua-filter=assets/update-image-paths.lua --citeproc -o output/print.html

```




