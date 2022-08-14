import React from "react";
import { CardProps } from "../../types/global";

const Card = ({ children, title, headerRight = <></>, backgroundColor = "bg-slate-300", borderColor = "border-slate-600", maxHeight = "" }: CardProps) => {
  return (
    <div className={`flex-row p-1.5 ${backgroundColor} rounded border-l-[8px] ${borderColor} ${maxHeight}`}>
      <div className="flex flex-row justify-between">
        <h1 className="font-medium">{title}</h1>
        {headerRight}
      </div>
      {children}
    </div>
  );
};
export default Card;
