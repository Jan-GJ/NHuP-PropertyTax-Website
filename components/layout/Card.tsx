import React from "react";
import { CardProps } from "../../types/global";

const Card = ({ children, title, headerRight = <></> }: CardProps) => {
  return (
    <div className="flex-row p-1.5">
      <div className="flex flex-row justify-between">
        <h1 className="font-medium">{title}</h1>
        {headerRight}
      </div>
      {children}
    </div>
  );
};
export default Card;
