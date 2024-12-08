local filenames = PANDOC_STATE.input_files or {}

function Pandoc(doc)
  local blocks = {}

  -- Check if input files are available
  if not filenames or #filenames == 0 then
    io.stderr:write("Error: No input files found in PANDOC_STATE.input_files\n")
    return doc
  end

  -- Process each file independently
  for _, filename in ipairs(filenames) do
    -- Extract the ID from the filename (the name without the extension)
    local section_id = filename:match("([^/]+)%.md$")
    local section_class = ""

    -- Check if the filename contains "chapter"
    if filename:match("chapter") then
      section_class = " class=\"chapter\""
    end

    -- Add a section for each file with the optional class
    table.insert(blocks, pandoc.RawBlock("html", "<section id=\"" .. section_id .. "\"" .. section_class .. ">"))
    
    -- Read the content of the file as raw text
    local file = io.open(filename, "r")
    if not file then
      io.stderr:write("Error: Unable to read file " .. filename .. "\n")
      return doc
    end
    local file_content = file:read("*all")
    file:close()

    -- Convert the Markdown content to Pandoc blocks
    local file_doc = pandoc.read(file_content, 'markdown')

    -- Add the blocks from the file to the section
    for _, block in ipairs(file_doc.blocks) do
      table.insert(blocks, block)
    end
    
    -- Close the section
    table.insert(blocks, pandoc.RawBlock("html", "</section>"))
  end

  -- Return the modified document
  return pandoc.Pandoc(blocks, doc.meta)
end
