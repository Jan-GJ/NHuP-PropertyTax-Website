import React from "react";
import { ButtonProps } from "../../types/global";

const Button = ({ name, onClick = () => {}, disabled = false, loading = false }: ButtonProps) => {
  return (
    <div className="flex flex-col">
      <button disabled={disabled} className={`${disabled ? "bg-accent/50 " : "bg-accent"} py-1 px-5 text-white`} onClick={onClick}>
        <p className="text-white">{name}</p>
      </button>
      {loading ? <div className="loadingIndicator" /> : null}
    </div>
  );
};

export default Button;
