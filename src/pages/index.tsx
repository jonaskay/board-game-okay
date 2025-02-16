import React, { ReactNode } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = ({}: PageProps): JSX.Element => {
  return (
    <div className="w-full h-full min-h-screen p-4 sm:p-16 bg-gradient-to-bl from-slate-800 to-slate-900">
      <main className="container mx-auto my-16">
        <div className="w-64 h-64 mx-auto rounded-xl shadow-xl shadow-slate-600/40 overflow-hidden">
          <StaticImage src="../images/icon.png" alt="Board Game Okay Logo" />
        </div>
        <div className="flex justify-center space-x-8">
          <div className="max-w-md text-center text-white">
            <h1 className="mt-12 mb-6 text-3xl sm:text-5xl font-bold">
              Board Game Okay
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Podcast about board games and the hobby of board gaming.
            </p>
            <p className="mt-4 text-lg sm:text-xl">
              Hosted by Luis and Joonas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Board Game Okay - Podcast About Board Games</title>
);
