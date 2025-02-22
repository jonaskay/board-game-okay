import { StaticImage } from "gatsby-plugin-image";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="w-full h-full min-h-screen p-4 sm:p-16">
      <main className="container mx-auto my-16">
        <div className="w-64 h-64 mx-auto rounded-xl shadow-xl shadow-slate-600/40 overflow-hidden">
          <StaticImage src="../images/icon.png" alt="Board Game Okay Logo" />
        </div>
        <div className="flex justify-center space-x-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
