#!/bin/bash

TARGET_DIR="${1:-.}"

find "$TARGET_DIR" -type f -name "*.jpg" ! -name "*-m.jpg" ! -name "*-mask.jpg" | while IFS= read -r file; do
    output="${file%.jpg}-s.jpg"
    magick "$file" -resize 430x600 -quality 90 "$output"
    echo "Compressed $file"
done