function Image(elem)
  -- Extract the filename from the current path
  local filename = elem.src:match("[^/]+$")
  if filename then
    -- Prepend the base path "/src/images/" to the filename
    elem.src = "/src/images/" .. filename
  end
  return elem
end
