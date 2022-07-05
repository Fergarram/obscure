const fs = require('fs');
const path = require('path');

function compileImage(md, openPattern = '{{', closePattern = '}}') {
  // replace md images if image plugin is being used
  const MDImgRegex = /!\[([A-Za-z-_ \d]*)\]\(([^)]*)\)/gm;
  let match;
  const result = [];
  let lastIndex = 0;
  while ((match = MDImgRegex.exec(md)) !== null) {
    const [, alt, src] = match;
    result.push(
      md.slice(lastIndex, match.index),
      `<div class="md-img">${openPattern}picture alt="${alt}" src="${src}" /${closePattern}</div>`,
    );
    lastIndex = MDImgRegex.lastIndex;
  }
  result.push(md.slice(lastIndex));
  return result.join('');
}

async function createMarkdownStore({
  root,
  file,
  slug,
  shortcodes: { openPattern, closePattern } = {},
  parser,
  useImagePlugin = false,
  preserveFolderStructure = false,
}) {
  const ret = {
    slug: null,
    filename: null,
    frontmatter: null,
    html: null,
    data: null,
    compileHtml,
  };

  let source = fs.readFileSync(file, 'utf-8');
  let obsidianComments = source.match(/\%\%([^]*?)\%\%/g);
  if (obsidianComments && obsidianComments.length > 0) {            
    // console.log(obsidianComments.length);
    obsidianComments.forEach(item => {
      source = source.replace(item, '');
    });
  }
  const matches = source.match(/\s*^---[^\S\r\n]*\r?\n[\s\S]*?^---[^\S\r\n]*\r?(\n|$)/my);
  const header = matches && matches[0];
  if (!header) {
    ret.frontmatter = {};
  } else {
    const result = await parser.process(header);
    ret.frontmatter = result.data.frontmatter || {};
  }
  const { fileSlug, filename, breadcrumbs } = getSlug();
  ret.slug = fileSlug;
  ret.filename = filename;
  return ret;

  function getSlug() {
    let output = {};
    const relativePath = path.relative(root, file).replace(/\\/g, '/');
    if (slug && typeof slug === 'function') {
      const result = slug(relativePath, ret.frontmatter);
      if (typeof result === 'string') {
        output.fileSlug = result;
      }
    }
    if (ret.frontmatter.slug && !output.fileSlug) {
      output.fileSlug = ret.frontmatter.slug;
    }
    const fileName = preserveFolderStructure ? relativePath : file.split('/').pop();
    output.filename = fileName.replace('.md', '');
    if (!output.fileSlug) output.fileSlug = fileName.replace('.md', '').replace(/ /gim, '-');

    return output;
  }

  async function compileHtml() {
    if (ret.html != null) return;

    if (useImagePlugin) {
      source = compileImage(source, openPattern, closePattern);
    }

    const result = await parser.process(source);
    source = null;
    ret.html = result.contents;
    ret.frontmatter = result.data.frontmatter || {};
    delete result.data.frontmatter;
    ret.data = result.data;
  }
}
module.exports = createMarkdownStore;
