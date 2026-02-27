
#import "src/lib.typ": *
#show: notionly
#set document(title: [Demo per export a Typst])

#align(center)[
  #scale(160%)[✴️] \
  #title() \
]

= Això és un heading de nivell 1
== Això és un heading de nivell 2
=== Això és un heading de nivell 3
Això és text normal. Bla bla bla… Lorem ipsum dolor sit amet.\
$
e^(i pi) + 1 = 0
$
A dalt tenim una block equation i ara una inline equation $a/b = c$ molt xula.\
El següent té *negreta*, _cursiva_, #underline[subratllat] i #strike[strikethrough].\
// Toggle block
#toggle[Això és un toggle block\
][I això és un block children del toggle block.\
Aquest és el segon children block, podem tenir tots els children que vulguem\
]- Això és una bulleted list
  - I això una nested bulleted list
    + També podem posar numbered lists
    + Aquesta numbered list està nested dins les altres dues bulleted lists

A continuació una subpàgina\
Això és una subpàgina
#link("https://notion.so/30611a97-61ab-80fa-9156-c1501e88d148")[📄 Això és una subpàgina] // Child page
També podem tenir mentions de persones com \@Martí Pardo o de dates com 2026-02-14 o de subpàgines a les que tenim accés com _Això és una subpàgina_ o de subpàgines a les que no tenim accés com _Untitled_.\
Finalment podem tenir imatges, provinents d’un fitxer local:\
// Original file: https://prod-files-secure.s3.us-west-2.amazonaws.com/77162674-5bd4-41b0-b268-0283b584b178/8bf850cf-4aa2-4006-a926-7c8716480d59/Wikipedia-logo-v2.png
#figure(
  image("images/image-1.png")
)
O provinents d’una URL d’internet (externes):\
// Source URL: https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg
#figure(
  image("images/image-2.jpg"),
  caption: [A més una imatge pot contenir una caption, la qual és _rich_ text.]
)
I no estem! Podem tenir també callouts:\
#callout(icon: "📌", bg: notion.gray_bg)[
Això és un callout senzill\
El qual pot tenir children blocks, que ara en l’exemple és text però podrien ser qualsevol cosa.\
]
#callout(bg: notion.pink_bg)[
I els callouts poden no tenir icona, i tenir un altre color de fons\
]
#callout(bg: notion.pink_bg)[
=== I poden començar amb un títol
I tenir un nombre il·limitat\
De children blocks.\
]
#quote[
I també podem tenir cites\
]
També podem posar separadors\
#line(length: 100%, stroke: 0.1pt)
I el text pot estar de #text(fill: notion.gray_text)[color gris] o tenir el #highlight(fill: notion.green_text)[fons verd] o qualsevol dels colors permesos en Notion.\
També podem posar codi inline `let numero = 5;` o tenir un bloc de codi:\
```javascript
console.log("Hola bon dia");
```
Es poden posar també taules simples\
#table(
  columns: (1fr, 1fr, 1fr),
  align: (left, left, left),
  table.header([**], [*Dissabte*], [*Diumenge*]),
  [*Matí*], [Netejar l’habitació], [Programar],
  [*Tarda*], [Festa d’aniversari], [Estudiar Relativitat General]
)
El text també pot contenir #link("http://google.com/")[links] inline o com a mention #link("https://www.youtube.com/channel/UC-uhE2wGJlkstikv01jE8fA")[https://www.youtube.com/channel/UC-uhE2wGJlkstikv01jE8fA] o també podem convertir els links en bookmarks:\
#link("https://google.com")[https://google.com]
I a part de imatges, vídeos i similar, també podem pujar-hi fitxers locals:\
// Original file: https://prod-files-secure.s3.us-west-2.amazonaws.com/77162674-5bd4-41b0-b268-0283b584b178/b64269bf-7677-40bd-bd27-39fd86a5deb3/Normativa_reguladora_de_lavaluaci_UB-1.pdf
#link("https://notion.so/30511a9761ab802c808cdbb05b786986")[📄 File]
O fitxers provinents d’una URL externa:\
// Source URL: https://linear.axler.net/LADR4e.pdf
#link("https://notion.so/30511a9761ab802c808cdbb05b786986")[📄 File]
També podem posar elements embed com ara un vídeo de Youtube:\
// Source URL: https://www.youtube.com/watch?v=aXRTczANuIs
#link("https://notion.so/30511a9761ab802c808cdbb05b786986")[🎥 Video]
Un PDF local pujat com a embed:\
// Original file: https://prod-files-secure.s3.us-west-2.amazonaws.com/77162674-5bd4-41b0-b268-0283b584b178/1c232d7f-92cf-4bc7-8a0d-f1c4b45d6a27/Taules_Clebsch-Gordan-1.pdf
#link("https://notion.so/30511a9761ab802c808cdbb05b786986")[📕 PDF Document]
O un element interactiu qualsevol:\
// Embedded content: https://mapaor4.github.io/notion/Plotly/tenkas.html
#link("https://mapaor4.github.io/notion/Plotly/tenkas.html")[🔗 Embedded Content]
Doncs això seria tot. També es poden posar bases de dades però de moment no entrem a aquí.\
