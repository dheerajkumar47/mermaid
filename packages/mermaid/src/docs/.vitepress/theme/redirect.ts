interface Redirect {
  path: string;
  id?: string;
}

/**
 * Extracts the base slug from the old URL.
 * @param link - The old URL.
 */
const getBaseFile = (url: URL): Redirect => {
  const [path, params, ...rest] = url.hash
    .toLowerCase()
    .replace('.md', '')
    .replace(/^#\/?/g, '')
    .replace(/^\.\//g, '')
    .split('?');

  // Find id in params
  const id = params
    ?.split('&')
    .find((param) => param.startsWith('id='))
    ?.split('=')[1];

  return { path, id };
};

const idRedirectMap: Record<string, string> = {
  '8.6.0_docs': '',
  accessibility: 'config/theming',
  breakingchanges: '',
  c4c: 'syntax/c4',
  classdiagram: 'syntax/classDiagram',
  configuration: 'config/configuration',
  demos: 'ecosystem/integrations',
  development: 'community/development',
  directives: 'config/directives',
  entityrelationshipdiagram: 'syntax/entityRelationshipDiagram',
  examples: 'syntax/examples',
  faq: 'misc/faq',
  flowchart: 'syntax/flowchart',
  gantt: 'syntax/gantt',
  gitgraph: 'syntax/gitgraph',
  integrations: 'ecosystem/integrations',
  'language-highlight': '',
  markdown: '',
  mermaidapi: 'config/usage',
  mermaidcli: 'config/mermaidCLI',
  mindmap: 'syntax/mindmap',
  'more-pages': '',
  'n00b-advanced': 'config/n00b-advanced',
  'n00b-gettingstarted': 'intro/n00b-gettingStarted',
  'n00b-overview': 'community/n00b-overview',
  'n00b-syntaxreference': '',
  newdiagram: 'community/newDiagram',
  pie: 'syntax/pie',
  plugins: '',
  quickstart: 'intro/n00b-gettingStarted',
  requirementdiagram: 'syntax/requirementDiagram',
  security: 'community/security',
  sequencediagram: 'syntax/sequenceDiagram',
  setup: 'config/setup/README',
  statediagram: 'syntax/stateDiagram',
  themes: 'config/theming',
  theming: 'config/theming',
  tutorials: 'config/Tutorials',
  upgrading: '',
  usage: 'config/usage',
  'user-journey': 'syntax/userJourney',
};

const urlRedirectMap: Record<string, string> = {
  '/misc/faq.html': 'configure/faq.html',
  '/syntax/c4c.html': 'syntax/c4.html',
};

/**
 *
 * @param link - The old documentation URL.
 * @returns The new documentation path.
 */
export const getRedirect = (link: string): string | undefined => {
  const url = new URL(link);
  // Redirects for deprecated vitepress URLs
  if (url.pathname in urlRedirectMap) {
    return `${urlRedirectMap[url.pathname]}${url.hash}`;
  }

  // Redirects for old docs URLs
  const { path, id } = getBaseFile(url);
  if (path in idRedirectMap) {
    return `${idRedirectMap[path]}.html${id ? `#${id}` : ''}`;
  }
};
