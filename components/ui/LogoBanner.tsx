import Image from "next/image";
import React from "react";
import { LogoBannerProps } from "../../types/global";

const LogoBanner = ({ src, height, width, url }: LogoBannerProps) => {
  return (
    <div
      onClick={() => {
        if (url) window.open(url, "_blank");
      }}
      className="image"
    >
      <Image alt={src.split(".")[0].substring(1)} src={src} height={height} width={width} />
    </div>
  );
};

export default LogoBanner;
