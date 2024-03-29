// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Aravinda Kumar',
  tagline: 'Portfolio and Blog',
  url: 'https://aravinda-kumar.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'aravindarc', // Usually your GitHub org/user name.
  projectName: 'aravinda-kumar', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/aravindarc/aravinda-kumar/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/aravindarc/aravinda-kumar/tree/main/',
        },
        gtag: {
          trackingID: 'G-50GE9B0WZH',
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'tamil',
          path: 'tamil',
          routeBasePath: 'tamil',
          sidebarPath: require.resolve('./sidebars.js')["tamilSidebar"],
      }
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Aravinda Kumar',
        logo: {
          alt: 'My Site Logo',
          src: 'img/keyboard.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: "/tamil/செந்தித்துறை", label: 'தமிழ்', position: 'left'},
          {
            href: 'https://github.com/aravindarc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Connect with Me',
            items: [
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/in/aravinda-kumar',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/aravindarc',
              }
            ],
          },
          {
            title: 'Other',
            items: [
              {
                label: 'Website Code',
                href: 'https://github.com/aravindarc/aravinda-kumar'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Aravinda Kumar. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['hcl', 'shell-session', "java", 'toml']
      },
    }),
};

module.exports = config;
