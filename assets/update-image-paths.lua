function Image(elem)
  -- Trouve la position de "images/" dans le chemin actuel
  local start_index = string.find(elem.src, "images/")
  if start_index then
    -- Conserve uniquement la partie après "images/"
    local new_path = string.sub(elem.src, start_index)
    -- Ajoute le chemin de base "/src/" devant le nouveau chemin
    elem.src = "../src/" .. new_path
  end
  return elem
end