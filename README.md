# Obscure - A static site generator for Obsidian vaults based on Elder.js 

I needed a way to publish my exsiting Obsidian research vault so that new readers could explore it. I considered the existing [Obsidian publishing service](https://obsidian.md/publish) but I don't like how limited in terms of customizability it is.

Here's a list of essential features for me:

- Blazing fast
- SEO first
- No client-side routing
- Highly customizable
- Custom shortcodes

Currently, Obscure is still a WIP and should not be used in any serious way. I do plan to make this as accesible as possible, even for non-technical users. So here is a roadmap of how that may look:

## Roadmap to V1

If you don't see a feature you'd expect from Obsidian it means I already implemented it or I will not do it. Also, I marked with a "‼️" all the must features or all the features that the MVP needs which will allow me to push my research vault to obscurity.wiki; and I'm using "🗳" for all the needed features for [nuestro.voto](//fernando.works/projects/nuestro-voto).

- [ ] Cover most of [Obsidian MD specs](https://help.obsidian.md/How+to/Format+your+notes).
	- [x] ‼️ Strike through with `~~x~~` (fixed with [remark-gfm](https://github.com/remarkjs/remark-gfm))
	- [ ] Highlighting with `==x==` or `::x::`
	- [ ] Image resizing
	- [x] Automatic links (fixed with [remark-gfm](https://github.com/remarkjs/remark-gfm))
	- [x] Tables (fixed with [remark-gfm](https://github.com/remarkjs/remark-gfm))
	- [x] 🗳 Footnotes (fixed with [remark-gfm](https://github.com/remarkjs/remark-gfm))
	- [ ] Math
	- [ ] 🗳 Callouts
- [ ] Handle empty files
	- [x] ‼️ Show message instead of empty content.
	- [ ] Have the message be an option in `obscure.config.js`.
- [ ] Handle [embedded files](https://help.obsidian.md/How+to/Embed+files).
	- [ ] Markdown files: md;
	- [ ] Image files: png, jpg, jpeg, gif, bmp, svg;
		- [x] ‼️ Render img tag
		- [ ] 🗳 Use [Elder.js Images Plugin](https://github.com/Elderjs/plugins/tree/master/packages/images) to process embedded images.
	- [ ] Audio files: mp3, webm, wav, m4a, ogg, 3gp, flac;
	- [ ] 🗳 Video files: mp4, webm, ogv, mov, mkv;
	- [ ] 🗳 PDF files: pdf.
		- [ ] 🗳 Page index support
- [ ] ‼️ Fix all bugs/fixme/todos (which I won't bother to write here).
- [x] ‼️ Finish mobile styles.
- [x] ‼️ Implement search.
- [ ] Show backlinks.
- [ ] 🗳 Add DRAFT prefix support.
- [ ] Obsidian notes (`%%`)
	- [x] ‼️ Toggle for user to show/hide notes.
	- [ ] Save user decision on local storage.
	- [ ] 🗳 Have that be an option in `obscure.config.js`.
	- [ ] 🗳 Parse notes content as markdown.
- [ ] 🗳 List generator shortcodes, render lists based on a query string, similar to the search bar in Obsidian.
- [ ] 🗳 General clean up, formalize project setup and make it easy to configure.
- [ ] 🗳 Generate tag pages which list all the files using the tag.

> ⚠️ Know in advance that I will NOT implement a graph view.

One of my personal uses for Obscure besides my personal research vault is to generate a wiki for [nuestro.voto](//fernando.works/projects/nuestro-voto). This means you can expect me to complete the roadmap above before the year 2022 ends.


## Further goals

As I mentioned, I intend to make this usable by programming-impaired users. To do so, I want to create either an Obsidian plugin or a "native" app that allows these users to pick a vault, customize their site settings, and have the app generate either a git repository that can be used to push this to netlify or any static web hosting service or something similar.

Here's the [Figma file](https://www.figma.com/file/S1H33ONKWWWsGL2n6zFTUc/Documentation-Template?node-id=0%3A1) where it all started.
