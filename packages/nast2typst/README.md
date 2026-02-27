# NAST to Typst (nast2typst)
This package transforms a unified-like Notion Abstract Sintax Tree (NAST) in JSON format into a string of Typst code (Typst is an alternative to LaTeX).

## Approach

### Preamble

```typ
// #import "@preview/notionly:0.1.0":  * // When published
#show: notionly
```


### Notion page information 
The Notion page information gets simply converted into:
```typ
#set document(title: [Here it goes the title of the Notion page])

#align(center)[
  #scale(160%)[✴️] \ // Emoji or icon of the Notion page
  #title() \
]
```

### Math
For math we internally use the package `tex2typst` for converting the expressions into Typst math language Sometimes tex2typst fails and then we provide the LaTeX code commented out. Due to the content sometimes being in KaTeX (instead of LaTeX) some things do not work out directly and need to be fixed on our side.

### Callout, toggles, bookmarks, checklists...


The Notionly Typst package (made by the same author of this npm package) internally changes some styles (for example of quotes or code blocks) and also exposes some custom functions (like `#callout`) or defines some custom markup (like [X] for checklists) and some custom variables (like the notion palette colors).

## Mapping (Notion → Typst)

### Rich Text (Inline)

| Format | Typst |
|--------|-------|
| Bold | `*text*` |
| Italic | `_text_` |
| Underline | `#underline[text]` |
| Strikethrough | `#strike[text]` |
| Inline code | `` `code` `` |
| Inline math | `$expression$`|
| Text color | `#text(fill: text_color)` |
| Background color | `#highlight(fill: bg_color)` |

### Blocks

| Block Type | Typst |
|------------|-------|
| Headings | `=`, `==`, `===` |
| Divider | `#line(length: 100%, stroke: 0.1pt)` |
| Quote | `#quote[...]` |
| Code block | \`\`\`py `print("Works like in markdown...")`  \`\`\` |
| Callouts | `#callout(icon: "📌", bg: notion.blue_bg)[...]` |
| Lists (unordered and ordered) | `-` and `+`|
| Checklists |  `[ ]` and `[X]`
| Tables | `#table( columns: (1fr, 1fr), align: (left, left),  table.header([*Col1*], [*Col2*]), [cell], [cell])` |
| Images | `#figure(image("images/image-1.png"), caption: [...])` |
| Media | Links to original Notion page
| Bookmarks and Embeds | `#link("url")[...]` |
| Toggles | `#toggle[title][body]` or `#toggle(heading: 2)[title][body]` |
| Columns | `#columns(n, gutter: 2em)[... #colbreak() ...]` |
| Math | `$ [...] $` but converted to Typst math using `text2typst`|

# License
[MIT](../LICENSE)