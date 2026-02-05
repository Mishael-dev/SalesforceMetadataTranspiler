#!/bin/bash

# Navigate to the fields directory
# cd fields || exit 1

# Remove existing max_doc.md if it exists
rm -f max_doc.md

# Find all doc.md files and combine them
for dir in */; do
    if [ -f "${dir}doc.md" ]; then
        echo "# ${dir%/}" >> max_doc.md
        echo "" >> max_doc.md
        cat "${dir}doc.md" >> max_doc.md
        echo "" >> max_doc.md
        echo "---" >> max_doc.md
        echo "" >> max_doc.md
    fi
done

echo "Combined all doc.md files into max_doc.md"