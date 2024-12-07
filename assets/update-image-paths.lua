function Image(elem)
  -- Find the position of "images/" in the current path
  local start_index = string.find(elem.src, "images/")
  if start_index then
    -- Keep only the part after "images/"
    local new_path = string.sub(elem.src, start_index)
    -- Prepend the base path "/src/" to the new path
    elem.src = "../src/" .. new_path
  end
  return elem
end