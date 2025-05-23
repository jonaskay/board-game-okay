import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Links from "../components/links";
import Vote from "../components/vote";

const IndexPage = ({}: PageProps): JSX.Element => {
  return (
    <div className="w-full h-full min-h-screen p-4 sm:p-16 bg-gradient-to-bl from-slate-800 to-slate-900">
      <main className="container mx-auto my-16">
        <div className="w-64 h-64 mx-auto sm:mx-8 rounded-xl shadow-xl shadow-slate-600/40 overflow-hidden">
          <StaticImage src="../images/icon.png" alt="Board Game Okay Logo" />
        </div>
        <div className="px-4 sm:px-8">
          <div className="prose prose-invert prose-slate my-12">
            <h1 className="">Board Game Okay</h1>
            <p className="mt-4 text-lg sm:text-xl">
              Podcast about board games and the hobby of board gaming.
            </p>
            <p className="mt-4 text-lg sm:text-xl">
              Hosted by Luis and Joonas.
            </p>
            <Vote />
          </div>
          <Links />
        </div>
      </main>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Board Game Okay - Podcast About Board Games</title>
);
