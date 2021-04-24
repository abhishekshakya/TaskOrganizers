import React from "react";
import { Shimmer } from "./Shimmer";
import { SkeletonElement } from "./SkeletonElement";

interface SkeletonCardProps {}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({}) => {
  return (
    <div className="skeleton__card">
      <Shimmer />
      <div className="skeleton__title">
        <SkeletonElement type="title" />
        <div style={{ display: "flex" }}>
          <div className="skeleton__circle" />
          <div className="skeleton__circle" />
        </div>
      </div>
      <div className="skeleton__line"></div>

      <SkeletonElement type="desc" />
      <SkeletonElement type="desc" />
    </div>
  );
};
