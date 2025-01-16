#!/bin/bash

TARGET_DIR="${1:-.}"

find "$TARGET_DIR" -type f -name "*-mask.jpg" | while IFS= read -r file; do
    output="${file%.jpg}.png"
    # magick "$file" -alpha extract "$output"
    magick "$file" -negate -transparent white "$output"
    echo "Converted $file to $output"
done