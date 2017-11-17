# for sanity checking operations on the dataset
function count-documents {
  find . -maxdepth 1 -type d | while read -r dir; do printf "%s:\t" "$dir"; find "$dir" -type f | wc -l; done
}
# for cleaning the corpus
function count-documents {
  for file in ./corpuses/20news-bydate/*/*/*
  do
      iconv -f utf8 -t utf8 -c "$file" >"$file.new"
      mv -f "$file.new" "$file"
  done
}
