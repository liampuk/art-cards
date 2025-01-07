#!/bin/bash

TARGET_DIR="${1:-.}"

find "$TARGET_DIR" -type f -name "*.png" ! -name "*-mask.png" | while IFS= read -r file; do
    output="${file%.png}-s.png"
    magick "$file" -resize 606x840 "$output"
    echo "Compressed $file"
done