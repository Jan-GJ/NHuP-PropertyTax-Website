import React from "react";

interface ButtonType {
  name: string;
  onClick?: any;
  disabled?: boolean;
  icon?: JSX.Element;
}

const Button = ({ name, onClick = () => {}, disabled = false, icon = <></> }: ButtonType) => {
  return (
    <div className="flex items-center space-x-1">
      <button disabled={disabled} className={` ${disabled ? "bg-[#229D56]/50" : "bg-[#229D56]"} py-1 px-5 text-white`} onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

export default Button;
