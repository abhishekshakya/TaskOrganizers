import React from "react";

interface ShimmerProps {}

export const Shimmer: React.FC<ShimmerProps> = ({}) => {
  return (
    <div className="shimmer__container">
      <div className="shimmer" />
    </div>
  );
};
