import React from "react";
import "./Header.css";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="header">
      <p>Heading Navigation</p>
    </div>
  );
};
