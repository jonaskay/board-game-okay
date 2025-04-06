import React, { ReactNode } from "react";

type BadgeProps = {
  image: string;
  name: string;
  url: string;
};

const Badge = ({ image, name, url }: BadgeProps): JSX.Element => {
  return (
    <a href={url} className="inline-block">
      <img className="h-12" src={image} alt={name} />
    </a>
  );
};

export default Badge;
