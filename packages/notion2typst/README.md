# Notion to Typst
This package is simply a wrapper over the following packages:

1. notion2nbt
2. nbt2nast
3. nast2typst
4. nast-fetch-images

It uses the other packages to provide a more direct conversion: given a notion pageId and notion token, you get the typst code and the images in the page.