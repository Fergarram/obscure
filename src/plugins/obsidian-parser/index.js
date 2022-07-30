const glob = require('glob');
const path = require('path');
const fs = require('fs');
const remarkHtml = require('remark-html');
const remarkSlug = require('remark-slug');

const { decode, encode } = require('html-entities');
const { findEmoji, slugify } = require('./utils/utils');

const prepareMarkdownParser = require('./utils/prepareMarkdownParser');
const createMarkdownStore = require('./utils/markdownStore');

const extractFrontmatter = require('remark-extract-frontmatter');
const remarkFrontmatter = require('remark-frontmatter');
const yaml = require('yaml').parse;

const remarkPlugins = [
  remarkFrontmatter,
  [ extractFrontmatter, { name: 'frontmatter', yaml: yaml } ],
  remarkSlug,
  [ remarkHtml, { sanitize: false } ],
];

const arrangeIntoTree = (paths, pluginConfig) =>  {
  let tree = [];

  const findWhere = (array, key, value) => {
      let t = 0;
      while (t < array.length && array[t][key] !== value) { t++; };

      if (t < array.length) {
          return array[t]
      } else {
          return false;
      }
  };

  for (let i = 0; i < paths.length; i++) {
      const filepath = paths[i];
      let currentLevel = tree;
      for (let j = 0; j < filepath.length; j++) {
          let part = filepath[j];

          let existingPath = findWhere(currentLevel, 'name', part.replace('.md', ''));

          if (existingPath) {
              currentLevel = existingPath.children;
          } else {
            let slug = slugify(part.replace('.md', '')).replace(/^-/g, '');
            slug = slug === pluginConfig.home ? '/' : slug

            const finalPath = filepath.map(p => slugify(p.replace('.md', '')).replace(/^-/g, '')).join('/');
            const finalParts = finalPath.split('/');

            if (finalParts[finalParts.length - 2] === finalParts[finalParts.length - 1]) {
              finalParts.splice(finalParts.length - 2, 1);
            }

            const newPart = {
                name: part.replace('.md', ''),
                slug,
                // @TODO: Make sure to place the path relative to the route permalink.
                path: finalParts.join('/'),
                children: [],
            }

            currentLevel.push(newPart);
            currentLevel = newPart.children;
          }
      }
  }

  return tree;
};

const plugin = {
  name: 'obsidian-parser',
  description: '',
  init: async (plugin) => {
    // used to store the data in the plugin's closure so it is persisted between loads
    plugin.markdown = {};
    plugin.fileTree = [];
    plugin.requests = [];

    plugin.references = {};

    if (plugin.config.remarkPlugins.length === 0) {
      plugin.config.remarkPlugins = remarkPlugins;
    }

    if (plugin.config.useSyntaxHighlighting) {
      const rehypeShiki = require('./rehype-shiki');
      let rehypeShikiConfig = {};
      if (typeof plugin.config.useSyntaxHighlighting !== 'boolean') {
        rehypeShikiConfig = plugin.config.useSyntaxHighlighting;
      }
      plugin.config.remarkPlugins.push([rehypeShiki, rehypeShikiConfig]);
    }

    if (plugin.config.useTableOfContents) {
      const tableOfContents = require('./utils/tableOfContents');
      plugin.config.remarkPlugins.push(tableOfContents);
    }

    if (plugin.config.useGitHubFriendlyMarkdown) {
      const remarkGfm = require('remark-gfm');
      let gfmConfig = {};
      if (typeof plugin.config.useGitHubFriendlyMarkdown !== 'boolean') {
        gfmConfig = plugin.config.useGitHubFriendlyMarkdown;
      }
      plugin.config.remarkPlugins.push([remarkGfm, gfmConfig]);
    }

    plugin.markdownParser = prepareMarkdownParser(plugin.config.remarkPlugins);

    if (plugin.config && Array.isArray(plugin.config.routes) && plugin.config.routes.length > 0) {
      for (const route of plugin.config.routes) {
        plugin.markdown[route] = [];
        const contentPath = plugin.config.contents[route] || null;
        let mdsInRoute = path.resolve(plugin.settings.srcDir, './routes/', route);
        if (contentPath) {
          mdsInRoute = path.resolve(plugin.settings.rootDir, contentPath);
          if (!fs.existsSync(mdsInRoute)) {
            throw new Error(`elderjs-plugin-markdown: Unable to find path ${mdsInRoute}`);
          }
        }

        const mdFiles = glob.sync(`${mdsInRoute}/vault/**/*.md`);

        const paths = [];

        for (const file of mdFiles) {
          const markdown = await createMarkdownStore({
            pluginConfig: plugin.config,
            root: mdsInRoute,
            file,
            parser: plugin.markdownParser,
            useImagePlugin: plugin.settings.plugins['@elderjs/plugin-images'] && plugin.config.useElderJsPluginImages,
            shortcodes: plugin.settings.shortcodes
          });
          plugin.markdown[route].push(markdown);
          const relFilename = path.relative(mdsInRoute, file).replace(/\\/g, '/');
          const parts = relFilename.split('/');
          parts.shift(); // Remove the 'vault' folder container.
          paths.push(parts);
        }

        plugin.flatFileList = paths.map(filepath => {
          const finalPath = filepath.map(p => slugify(p.replace('.md', '')).replace(/^-/g, '')).join('/');
          const finalParts = finalPath.split('/');

          if (finalParts[finalParts.length - 2] === finalParts[finalParts.length - 1]) {
            finalParts.splice(finalParts.length - 2, 1);
          }

          return {
            name: filepath[filepath.length - 1].replace('.md', ''),
            path: filepath.slice(0, -1).join(' / '),
            url: finalParts.join('/'),
          }
        });

        plugin.fileTree = arrangeIntoTree(paths, plugin.config);

        // if there is a date in frontmatter, sort them by most recent
        const haveDates = plugin.markdown[route].reduce((out, cv) => {
          return out && !!cv.frontmatter && !!cv.frontmatter.date;
        }, true);

        if (haveDates) {
          plugin.markdown[route] = plugin.markdown[route].sort(
            (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date),
          );
        }
      }

      // Remove drafts on production. Add DRAFT: to the title on dev.
      Object.keys(plugin.markdown).forEach((route) => {
        if (process.env.NODE_ENV === 'production') {
          plugin.markdown[route] = plugin.markdown[route].filter(
            (md) => !md.frontmatter.draft && md.slug.indexOf('draft-') !== 0,
          );
        } else {
          plugin.markdown[route].forEach((md) => {
            if (md.frontmatter.draft || md.slug.indexOf('draft') === 0) {
              md.frontmatter.title = `DRAFT: ${md.frontmatter.title || 'MISSING TITLE'}`;
            }
          });
        }
      });

      // loop through object to create requests
      Object.keys(plugin.markdown).forEach((route) => {
        plugin.markdown[route].forEach((md) => {
          plugin.requests.push({ slug: md.slug, route });
        });
      });
    }

    return plugin;
  },
  config: {
    routes: [],
    remarkPlugins: [], // if you define your own, you must define remarkHtml another html parser or you'll have issues. Order matters here.
    useElderJsPluginImages: true,
    useSyntaxHighlighting: false,
    useTableOfContents: false,
    useGitHubFriendlyMarkdown: true,
    createRoutes: true,
    contents: {},
  },
  shortcodes: [],
  hooks: [
    {
      hook: 'bootstrap',
      name: 'addMarkdownParserToHelpers',
      description:
        'Adds markdown parser to helpers so that it can be used other Elder.js plugins, user defined hooks, or in templates. ',
      priority: 99,
      run: async ({ helpers, plugin }) => {
        return {
          helpers: {
            ...helpers,
            markdownParser: plugin.markdownParser,
          },
        };
      },
    },

    {
      hook: 'bootstrap',
      name: 'addMdFilesToDataObject',
      description: 'Add parsed .md content and data to the data object',
      priority: 99,
      run: async ({ data, plugin }) => {
        if (plugin.config.routes.length > 0) {
          return {
            data: {
              ...data,
              markdown: plugin.markdown,
              routeFileTree: plugin.fileTree,
              flatFileList: plugin.flatFileList
            },
          };
        }
      },
    },
    {
      hook: 'allRequests',
      name: 'mdFilesToAllRequests',
      description:
        'Add collected md files to allRequests array using the frontmatter slug or filename as the slug. Users can modify the plugin.requests before this hook to change generated requests.',
      priority: 50,
      run: async ({ allRequests, plugin }) => {
        if (plugin.config.routes.length > 0 && plugin.config.createRoutes) {
          return {
            allRequests: [...allRequests, ...plugin.requests],
          };
        }
      },
    },
    {
      hook: 'request',
      name: 'resetReferencesOnRequest',
      description: `If references aren't reset, the plugin will collect references between page loads.`,
      run: async ({ request, plugin }) => {
        plugin.references[request.permalink] = [];
        return { plugin };
      },
    },
    {
      hook: 'data',
      name: 'addFrontmatterAndHtmlToDataForRequest',
      description: 'Adds parsed frontmatter and html to the data object for the specific request.',
      priority: 50,
      run: async ({ request, data, plugin }) => {
        if (data.markdown && data.markdown[request.route]) {
          const markdown = data.markdown[request.route].find((m) => m.slug === request.slug);
          if (markdown) {
            await markdown.compileHtml();

            let { filename, html, frontmatter, data: addToData, slug } = markdown;
            let breadcrumbs = [];

            // @TODO: Make sure that renamed slugs like "cognitive-research/cognitive-research" get propper breadcrumbs.
            if (slug.split('/').length > 1 && slug !== '/') {
              const urlParts = slug.split('/');

              let names = {};
              let tempTree = data.routeFileTree;
              for (let j = 0; j < urlParts.length; j++) {
                const newTree = tempTree.find((t) => t.slug === urlParts[j]);
                if (newTree) {
                  names[newTree.slug] = newTree.name;
                  tempTree = newTree.children;
                }
              }

              for (let j = 0; j < urlParts.length; j++) {
                breadcrumbs.push({
                  name: names[urlParts[j]],
                  slug: urlParts[j],
                  url: '/' + urlParts.slice(0, j+1).join('/')
                });
              }
            }

            if (frontmatter && !frontmatter.title) {
              frontmatter.title = filename;
            }

            // @TODO: Check for embeded files here...
            //        Convert them to shortcodes maybe?
            //        That always ends up weird...
            
            let internalLinks = html.match(/\[\[([^]*?)\]\]/g);
            // @TODO: do something about the internal links that lead to not yet created files.
            //        And about repeated filenames usually differentiated by their parent folders...
            if (internalLinks && internalLinks.length > 0) {
              internalLinks.forEach(link => {
                let name = decode(link.replace('[[', '').replace(']]', ''));
                const page = data.markdown[request.route].find((m) => m.filename === name);
                if (page) {
                  const emoji = findEmoji(name);
                  // @IMPROVE: This emoji condition seems finicky
                  if (emoji && emoji[0] && name[2] === ' ') name = name.replace(`${emoji[0]} `, `${emoji[0]}&nbsp;`);
                  // @TODO: Make sure to place the page.slug relative to the route permalink.
                  html = html.replace( link, `<a class="internal-link" href="/${page.slug}">${name}</a>`);
                } else {
                  html = html.replace( link, `<span class="ghost-link" title="Page not yet created.">${name}</span>`);
                }
              });
            }

            return {
              data: {
                ...data,
                ...addToData,
                html,
                breadcrumbs,
                frontmatter,
              },
            };
          }
        }
      },
    },
  ],
  remarkPlugins,
};

module.exports = plugin;
exports.default = plugin;
