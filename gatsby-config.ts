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
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  custom_elements: [
                    { "itunes:duration": edge.node.frontmatter.audioDuration },
                    { "itunes:episodeType": edge.node.frontmatter.type },
                    { "itunes:summary": edge.node.frontmatter.description },
                    { "itunes:explicit": edge.node.frontmatter.explicit },
                  ],
                  date: edge.node.frontmatter.date,
                  description: edge.node.frontmatter.description,
                  enclosure: {
                    size: edge.node.frontmatter.audioSize,
                    type: "audio/mp3",
                    url: edge.node.frontmatter.audioUrl,
                  },
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { frontmatter: {date: DESC}}
                ) {
                  edges {
                    node {
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
