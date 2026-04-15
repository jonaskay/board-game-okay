import React, { ReactNode } from "react";

type VoteProps = {};

const Vote = ({}: VoteProps): JSX.Element => {
  return (
    <div className="bg-slate-600 p-2 border border-slate-400 rounded">
      <div className="mb-2 font-medium">
        Voting for "#031 - Debate: Is Crowdfunding Good for the Hobbyist?" is
        on!
      </div>
      <div>
        Go to{" "}
        <a href="https://forms.gle/nQZUFFcNJBts5Sz27">
          https://forms.gle/nQZUFFcNJBts5Sz27
        </a>
      </div>
    </div>
  );
};

export default Vote;
