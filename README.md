# Obscure - A static site generator for Obsidian vaults based on Elder.js 

[Live Demo](https://obscurity.wiki)

I needed a way to publish my exsiting Obsidian research vault so that new readers could explore it. I considered the existing [Obsidian publishing service](https://obsidian.md/publish) but I don't like how limited in terms of customizability it is.

Here's a list of essential features for me:

- Blazing fast
- SEO first
- No client-side routing
- Highly customizable
- Custom shortcodes

## Installation

```bash
# Download template with degit
degit git@github.com:Fergarram/obscure.git my-vault-site

# Create a symlink of your vault into the route folder
# NOTE: For some reason if the link is created outside the current folder it doesn't work. At least on MacOS.
cd my-vault-site/src/routes/default
ln -s /path/to/your/vault vault
cd ../../../

# Install dependencies and run watch server on localhost:3000
npm install
npm run dev
```
