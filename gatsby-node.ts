import { createFilePath } from "gatsby-source-filesystem";
import path from "path";

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const template = path.resolve(`./src/templates/episode.tsx`);
  const result = await graphql(
    `
      {
        allMdx(sort: { frontmatter: { date: DESC } }) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const episodes = result.data.allMdx.edges;

  episodes.forEach((episode) => {
    createPage({
      path: episode.node.fields.slug,
      component: template,
      context: {
        slug: episode.node.fields.slug,
      },
    });
  });
};
