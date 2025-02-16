import { graphql, HeadFC } from "gatsby";
import React, { ReactNode } from "react";
import Layout from "../components/layout";

type EpisodeProps = {
  children: ReactNode;
};

const Episode = ({ data }: EpisodeProps): JSX.Element => {
  const {
    mdx: {
      frontmatter: { description, title },
    },
  } = data;

  return (
    <Layout>
      <div className="max-w-md text-center text-white">
        <h1 className="mt-12 mb-6 text-3xl font-bold">{title}</h1>
        <p className="mt-4 text-lg">{description}</p>
      </div>
    </Layout>
  );
};

export default Episode;

export const query = graphql`
  query EpisodeBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        description
        title
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <title>Board Game Okay - Podcast About Board Games</title>
);
