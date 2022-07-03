# Obscure - A static site generator for Obsidian vaults based on Elder.js 

Blank starter template for Elder.js sites.

This template asumes you have basic knowledge of how to use Elder.js. If you are wanting to learn more about all the bits and pieces then go ahead and use the official Elder.js template. I created this template for myself to be able to quick-start new projects, it's basically a slim fork of the original. I usually want to be ready to add TailwindCSS, SCSS, or PostCSS. So I might add this as an option or something.

Here's a list of the main differences between this and the official template:

- I use tabs instead of spaces for all files.
- I removed prettier and eslint.
- I removed most examples only leaving placeholders for common things. 

## Get started

### Install the dependencies:

```bash
npm install # or just yarn
```

### Start Project:

```bash
npm start # or npm run dev
```

Navigate to [localhost:3000](http://localhost:3000). You should see your app running.

This spawns a development server, so simply edit a file in `src`, save it, and reload the page to see your changes.

#### What to Expect

- A dev server is watching your files for changes. It will restart when it needs to.
- Rollup is watching your files for changes. It will restart when it needs to.
- If your `elder.config.js` has `@elderjs/plugin-browser-reload': {}` in it's plugins, your browser will automatically restart after the server restarts.

**esbuild**

If you are looking for a faster development experience run `npm run esbuild` this is experimental but will be improving rapidly.

### To Build HTML for Production:

```bash
npm run build
```

Let the build finish. It will put all of your statically generated files in `./public`.

If you wish to preview you can use:

```bash
npx sirv-cli public
```

### To Run in SSR Mode for Production:

```bash
npm run serve
```
