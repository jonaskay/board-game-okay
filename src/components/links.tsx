import React from "react";

import spotifyBadge from "../images/spotify-badge.svg";
import applePodcastsBadge from "../images/apple-podcasts-badge.svg";
import pocketCastsBadge from "../images/pocket-casts-badge.svg";
import Badge from "./badge";

type LinksProps = {};

const Links = ({}: LinksProps): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-x-0 space-y-4 sm:space-y-0 sm:space-x-6">
      <Badge
        url="https://open.spotify.com/show/7Hq2aASRlZ8ri3MAo3S9bo"
        image={spotifyBadge}
        name="Listen on Spotify"
      />
      <Badge
        url="https://podcasts.apple.com/us/podcast/board-game-okay/id1796664198?itscg=30200&itsct=podcast_box&ls=1&mttnsubad=1796664198"
        image={applePodcastsBadge}
        name="Listen on Apple Podcasts"
      />
      <Badge
        url="https://pca.st/o8ab69h9"
        image={pocketCastsBadge}
        name="Listen on Pocket Casts"
      />
    </div>
  );
};

export default Links;
