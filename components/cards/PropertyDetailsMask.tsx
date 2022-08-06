import React from "react";
import Card from "../layout/Card";

const PropertyDetailsMask = () => {
  return (
    <Card title="Informationen zum Grundstück">
      <div className="p-3 space-y-2 flex flex-col">
        <h1>Eigentumsverhätnisse</h1>
        <h1>Art des Grundstücks</h1>
        <h1>Erstreckts sich über mehrere Gemeinden</h1>
        <h1>zeig das an wenn mehr als 10000qm sind für befestigt</h1>
      </div>
    </Card>
  );
};

export default PropertyDetailsMask;
