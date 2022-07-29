import React from "react";
import { CardProps } from "../../types/global";

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="flex-row p-1.5">
      <h1 className="font-medium">{title}</h1>
      {children}
    </div>
  );
};
export default Card;
