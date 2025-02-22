import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Board Game Okay`,
    description: `Board Game Okay is a podcast about board games and the hobby of board gaming.`,
    siteUrl: `https://www.boardgameokay.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        setup: ({
          query: { site },
        }: {
          query: {
            site: {
              siteMetadata: {
                title: string;
                description: string;
                siteUrl: string;
              };
            };
          };
        }) => ({
          custom_namespaces: {
            itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
          },
          custom_elements: [
            { "itunes:author": "Board Game Okay" },
            { "itunes:explicit": "clean" },
            {
              "itunes:image": {
                _attr: {
                  href: "https://storage.googleapis.com/board-game-okay-feed/board-game-okay-cover.png",
                },
              },
            },
            {
              "itunes:category": [
                {
                  _attr: {
                    text: "Leisure",
                  },
                },
                {
                  "itunes:category": {
                    _attr: {
                      text: "Games",
                    },
                  },
                },
              ],
            },
            {
              "itunes:owner": [
                { "itunes:name": "Board Game Okay" },
                { "itunes:email": "jonaskay@iki.fi" },
              ],
            },
          ],
          description: site.siteMetadata.description,
          language: "en",
          site_url: site.siteMetadata.siteUrl,
          title: site.siteMetadata.title,
        }),
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  custom_elements: [
                    { "itunes:duration": node.frontmatter.audioDuration },
                    { "itunes:episodeType": node.frontmatter.type },
                    { "itunes:summary": node.frontmatter.description },
                    { "itunes:explicit": node.frontmatter.explicit },
                  ],
                  date: node.frontmatter.date,
                  description: node.frontmatter.description,
                  enclosure: {
                    size: node.frontmatter.audioSize,
                    type: "audio/mp3",
                    url: node.frontmatter.audioUrl,
                  },
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: {date: DESC}}
                ) {
                  nodes {
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      description
                      type
                      explicit
                      date
                      audioDuration
                      audioSize
                      audioUrl
                    }
                  }
                }
              }
            `,
            title: "Board Game Okay",
            output: "feed.xml",
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "episodes",
        path: "./src/episodes/",
      },
      __key: "episodes",
    },
  ],
};

export default config;
