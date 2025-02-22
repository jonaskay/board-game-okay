import { graphql, HeadFC } from "gatsby";
import React, { ReactNode } from "react";
import Layout from "../components/layout";

type EpisodeProps = {
  children: ReactNode;
};

const Episode = ({ data }: EpisodeProps): JSX.Element => {
  const {
    markdownRemark: {
      html,
      frontmatter: { title },
    },
  } = data;

  return (
    <Layout>
      <div className="prose prose-invert prose-slate mt-12">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} className="" />
      </div>
    </Layout>
  );
};

export default Episode;

export const query = graphql`
  query EpisodeBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <title>Board Game Okay - Podcast About Board Games</title>
);
