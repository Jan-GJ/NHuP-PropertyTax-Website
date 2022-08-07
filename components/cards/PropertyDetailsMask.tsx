import React, { useState } from "react";
import { ownershipStructures } from "../../types/property";
import Card from "../layout/Card";
import Input from "../ui/Input";

const PropertyDetailsMask = () => {
  const ownershipStructureTextState = useState<String>("");
  const ownershipStructureTextErrorState = useState<String>("");
  const ownershipStructureTextIsCorrectState = useState<String>("");

  return (
    <Card title="Informationen zum Grundstück">
      <div className="p-3 space-y-2 flex flex-col">
        <Input
          valueState={ownershipStructureTextState}
          errorState={ownershipStructureTextErrorState}
          isCorrectState={ownershipStructureTextIsCorrectState}
          title="Eingentumsverhätnisse"
          placeholder="Alleineigentum einer natürlichen Person"
          allowedEndResults={ownershipStructures}
          suggestions={ownershipStructures}
          allowedCharsRegExp={/[^A-Za-zäöü -]/g}
          width={"min-w-[300px]"}
        />
        <h1>Art des Grundstücks</h1>
        <h1>Erstreckts sich über mehrere Gemeinden</h1>
        <h1>zeig das an wenn mehr als 10000qm sind für befestigt</h1>
      </div>
    </Card>
  );
};

export default PropertyDetailsMask;
