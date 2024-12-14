#!/bin/bash

TARGET_DIR="${1:-.}"

find "$TARGET_DIR" -type f -name "*.png" | while IFS= read -r file; do
    output="${file%.png}.jpg"
    magick "$file" -alpha extract "$output"
    echo "Converted $file to $output"
done