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

If you don't see a feature you'd expect from Obsidian it means I already implemented it or I will not do it. Also, I marked with a "‼️" all those needed for the MVP which will allow me to push my research vault to obscurity.wiki.

- [ ] Cover most of [Obsidian MD specs](https://help.obsidian.md/How+to/Format+your+notes).
	- [ ] Strike through with `~~x~~` ‼️
	- [ ] Highlighting with `==x==` or `::x::`
	- [ ] Image resizing
	- [ ] Automatic links (no syntax just URL)
	- [ ] Tables
	- [ ] Footnotes
	- [ ] Math
	- [ ] Callouts
- [ ] Handle empty files (show message when empty or simply ignore them - available in `obscure.config.js`) ‼️
- [ ] Handle [embedded files](https://help.obsidian.md/How+to/Embed+files). ‼️
- [ ] Fix all bugs (which I won't bother to write here). ‼️
- [ ] Finish mobile styles. ‼️
- [ ] Implement search. ‼️
- [ ] Add DRAFT prefix support.
- [ ] Make Obsidian notes (`%%`) toggable by reader and have that be an option in `obscure.config.js`. ‼️
- [ ] List generator shortcodes, render lists based on a query string, similar to the search bar in Obsidian.
- [ ] General clean up, formalize project setup and make it easy to configure.

> NOTE: Know in advance that I will not implement a graph view.

One of my personal uses for Obscure besides my personal research vault is to generate a wiki for [nuestro.voto](//fernando.works/projects/nuestro-voto). This means you can expect me to complete the roadmap above before the year 2022 ends.


## Further goals

As I mentioned, I intend to make this usable by programming-impaired users. To do so, I want to create either an Obsidian plugin or a "native" app that allows these users to pick a vault, customize their site settings, and have the app generate either a git repository that can be used to push this to netlify or any static web hosting service or something similar.

Here's the [Figma file](https://www.figma.com/file/S1H33ONKWWWsGL2n6zFTUc/Documentation-Template?node-id=0%3A1) where it all started.
