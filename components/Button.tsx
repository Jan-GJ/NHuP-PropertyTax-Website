import React from "react";

interface ButtonType {
  name: string;
  onClick?: any;
  disabled?: boolean;
  iconName?: string;
}

const Button = ({ name, onClick = () => {}, disabled = false }: ButtonType) => {
  return (
    <button disabled={disabled} className={` ${disabled ? "bg-[#229D56]/50" : "bg-[#229D56]"} py-1 px-5 text-white`} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
