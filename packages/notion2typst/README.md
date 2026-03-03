# Notion to Typst
This package is simply a wrapper over the following packages:

1. [notion2nbt](./notion2nbt)
2. [nbt2nast](./nbt2nast)
3. [nast2typst](./nast2typst)
4. [nast-fetch-images](./nast-fetch-images)

It uses the other packages to provide a more direct conversion: given a notion page id and notion token, you get the typst code and the images (the content of the Notion page).
