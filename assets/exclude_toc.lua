function Header(el)
  -- Vérifie si l'attribut 'data-toc-exclude' est défini
  if el.attributes["data-toc-exclude"] == "true" then
    el.attributes["data-toc-ignore"] = "true"
  end
  return el
end

function Div(el)
  -- Filtre les éléments de la table des matières
  if el.identifier == "TOC" then
    el.content = filter(el.content, function(item)
      return not (item.attributes and item.attributes["data-toc-ignore"] == "true")
    end)
  end
  return el
end
