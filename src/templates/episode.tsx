import { graphql, HeadFC } from "gatsby";
import React, { ReactNode } from "react";
import Layout from "../components/layout";
import Links from "../components/links";

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
      <div>
        <div className="prose prose-invert prose-slate my-12">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} className="" />
        </div>
        <Links />
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
