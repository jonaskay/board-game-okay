import React, { ReactNode } from "react";

type VoteProps = {};

const Vote = ({}: VoteProps): JSX.Element => {
  return (
    <div className="bg-slate-600 p-2 border border-slate-400 rounded">
      <div className="mb-2 font-medium">
        Voting for #011 - Debate: Are Board Games Art is on!
      </div>
      <div>
        Go to{" "}
        <a href="https://forms.gle/1xyx3sNKLfAcM2HE7">
          https://forms.gle/1xyx3sNKLfAcM2HE7
        </a>
      </div>
    </div>
  );
};

export default Vote;
