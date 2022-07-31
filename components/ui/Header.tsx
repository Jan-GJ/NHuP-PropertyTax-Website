import React from "react";
import LogoBanner from "./LogoBanner";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <LogoBanner src="/nh-logo-banner.svg" width={230} height={64} url={"https://nhup.de/"} />
      <h1 className="text-accent text-4xl font-medium text-center">{"Grundstück anlegen"}</h1>
      <LogoBanner src="/gd-logo-banner.svg" width={230} height={64} url={"https://docs.grundsteuer-digital.de/"} />
    </div>
  );
};

export default Header;
